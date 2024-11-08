const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Conectar ao banco de dados MySQL
const db = mysql.createConnection({
    host: '54.166.41.166',
    user: 'peixe',
    password: '123',
    database: 'contatos'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Conectado ao banco de dados!');
});

// Endpoint para inserir dados
app.post('/api/contatos', (req, res) => {
    const { email, assunto, descricao } = req.body;
    const sql = 'INSERT INTO contato (email, assunto, descricao) VALUES (?, ?, ?)';
    db.query(sql, [email, assunto, descricao], (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Erro ao cadastrar contato' });
        } else {
            res.json({ message: 'Contato cadastrado com sucesso!' });
        }
    });
});

// Endpoint para listar dados
app.get('/api/contatos', (req, res) => {
    const sql = 'SELECT * FROM contato';
    db.query(sql, (err, results) => {
        if (err) {
            res.status(500).json({ error: 'Erro ao listar contatos' });
        } else {
            res.json(results);
        }
    });
});

// Iniciar o servidor
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
