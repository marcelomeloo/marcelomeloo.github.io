const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const toggleSoundButton = document.getElementById("toggleSound");
const restartButton = document.getElementById("restartButton");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let planeX = canvas.width / 2;
let planeY = canvas.height / 2;
let missileX = 0;
let missileY = 0;
let missileSpeed = 2;
let missileDirection = 0;
let missileFired = false;
let soundEnabled = true;
let explosion = false;
let explosionTimer = 0;

const planeImage = new Image(40, 40);
planeImage.src = "aviao.png";
planeImage.onload = () => update();

const missileImage = new Image(30, 30);
missileImage.src = "missile.png";
missileImage.onload = () => update();

const explosionImage = new Image(50, 50);
explosionImage.src = "explosion.png";

const explosionSound = new Audio("explosion.mp4");
const missileSound = new Audio("missile.mp4");

restartButton.addEventListener("click", () => restartGame());
toggleSoundButton.addEventListener("click", () => {
  soundEnabled = !soundEnabled;
  toggleSoundButton.textContent = soundEnabled ? "Mute Sound" : "Unmute Sound";
});

canvas.addEventListener("mousemove", (e) => {
  const coordX = e.clientX;
  const coordY = e.clientY;
  planeX = coordX - planeImage.width / 2;
  planeY = coordY - planeImage.height / 2;

  if (!missileFired && !explosion) {
    missileDirection = Math.atan2(planeY + planeImage.height / 2 - missileY, planeX + planeImage.width / 2 - missileX);
  }
});

canvas.addEventListener("contextmenu", (e) => {
  e.preventDefault();
  if (!missileFired && !explosion) {
    missileX = 0;
    missileY = 0;
    missileFired = true;
    if (soundEnabled) {
      missileSound.play();
    }
  }
});

function restartGame() {
  planeX = canvas.width / 2;
  planeY = canvas.height / 2;
  missileX = 0;
  missileY = 0;
  missileFired = false;
  explosion = false;
  explosionTimer = 0;
  requestAnimationFrame(update);
}

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  if (missileFired && !explosion) {
    const dx = planeX + planeImage.width / 2 - missileX;
    const dy = planeY + planeImage.height / 2 - missileY;
    missileDirection = Math.atan2(dy, dx); 
    missileX += missileSpeed * Math.cos(missileDirection);
    missileY += missileSpeed * Math.sin(missileDirection);
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < 15) {
      explosion = true;
      explosionTimer = 0;
      missileX = 0;
      missileY = 0;
      missileFired = false;
      if (soundEnabled) {
        explosionSound.play();
      }
    }
  }
  if (!explosion) {
    ctx.save();
    ctx.translate(missileX + missileImage.width / 2, missileY + missileImage.height / 2);
    ctx.rotate(missileDirection); 
    ctx.drawImage(missileImage, -5, -5, 30, 30);
    ctx.restore();
  }
  if (missileFired && !explosion) {
    ctx.save();
    ctx.rotate(missileDirection);
    ctx.restore();
  }
  if (!explosion) ctx.drawImage(planeImage, planeX, planeY, 40, 40);
  if (explosion) {
    ctx.drawImage(explosionImage, planeX - 10, planeY - 10, 50, 50);
    explosionTimer++;
    if (explosionTimer >= 120) restartGame()
  }

  requestAnimationFrame(update);
}


if (planeImage.complete && missileImage.complete) {
  update();
}