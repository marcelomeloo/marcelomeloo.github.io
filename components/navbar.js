const navbar = document.createElement("component")

navbar.innerHTML = `
<nav class="navbar navbar-expand-lg navbar-dark bg-primary">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Educar</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div class="navbar-nav">
        <a class="nav-link active" aria-current="page" href="index.html">Home</a>
        <a class="nav-link" href="students.html">Alunos</a>
        <a class="nav-link" href="professors.html">Professores</a>
        <a class="nav-link" href="adm.html">Administração</a>
        <a class="nav-link" href="visitors.html">Visitantes Externos</a>
      </div>
    </div>
  </div>
</nav>
`

document.body.appendChild(navbar)