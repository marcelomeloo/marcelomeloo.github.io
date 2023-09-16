import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import multer from 'multer';

const app = express();
const port = 4000;

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

// Rota para realizar upload de arquivo (POST)
app.post('/api/files', upload.single('file'), (req, res) => {
  res.send('Arquivo enviado com sucesso!');
});

// Rota para processar dados do formulário via GET
app.get('/api/data/:name', (req, res) => {
  console.log('Obtendo dados do formulário via GET');
  const { params: { name }} = req;
  res.send(`Olá, ${name}!`);
});

// Rota para obter dados JSON
app.get('/api/json-data', (req, res) => {
  const jsonData = {
    key1: 'valor1',
    key2: 'valor2',
    key3: 'valor3'
  };
  res.json(jsonData);
});

app.listen(port, () => {
  console.log(`Servidor iniciado em http://localhost:${port}`);
});
