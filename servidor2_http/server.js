import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Necessário para usar __dirname em ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Permite ler dados do formulário
app.use(express.urlencoded({ extended: true }));

// ==============================
// 📌 ROTA: Página inicial
// ==============================
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// ==============================
// 📌 ROTA: Cadastro
// ==============================
app.get('/cadastro', (req, res) => {
    res.sendFile(path.join(__dirname, 'cadastro.html'));
});

// ==============================
// 📌 ROTA: JSON de alunos
// ==============================
app.get('/alunos.json', (req, res) => {
    const caminho = path.join(__dirname, 'alunos.json');

    if (!fs.existsSync(caminho)) {
        return res.json([]);
    }

    const dados = fs.readFileSync(caminho);
    res.json(JSON.parse(dados));
});

// ==============================
// 📌 ROTA: HTML com alunos
// ==============================
app.get('/alunoshtml', (req, res) => {
    const caminho = path.join(__dirname, 'alunos.json');

    let alunos = [];

    if (fs.existsSync(caminho)) {
        const dados = fs.readFileSync(caminho);
        alunos = JSON.parse(dados);
    }

    let html = `
    <html>
    <head>
        <title>Alunos</title>
        <style>
            body { font-family: Arial; background:#f4f4f4; padding:20px; }
            table { width:100%; border-collapse:collapse; background:white; }
            th, td { padding:10px; border:1px solid #ccc; }
            th { background:#333; color:white; }
        </style>
    </head>
    <body>
        <h1>Lista de Alunos</h1>
        <table>
            <tr>
                <th>Matrícula</th>
                <th>Nome</th>
                <th>Telefone</th>
                <th>Email</th>
                <th>Curso</th>
            </tr>
    `;

    alunos.forEach(aluno => {
        html += `
        <tr>
            <td>${aluno.matricula}</td>
            <td>${aluno.nome}</td>
            <td>${aluno.telefone}</td>
            <td>${aluno.email}</td>
            <td>${aluno.curso}</td>
        </tr>`;
    });

    html += `
        </table>
        <br>
        <a href="/">Voltar</a>
    </body>
    </html>
    `;

    res.send(html);
});

// ==============================
// 📌 POST: Criar aluno
// ==============================
app.post('/aluno', (req, res) => {
    const novoAluno = req.body;

    const caminho = path.join(__dirname, 'alunos.json');

    let alunos = [];

    if (fs.existsSync(caminho)) {
        const dados = fs.readFileSync(caminho);
        alunos = JSON.parse(dados);
    }

    alunos.push(novoAluno);

    fs.writeFileSync(caminho, JSON.stringify(alunos, null, 2));

    res.send(`
        <h2>Aluno cadastrado!</h2>
        <a href="/cadastro">Novo cadastro</a><br>
        <a href="/alunoshtml">Ver alunos</a>
    `);
});

app.listen(PORT, () => {
    console.log(`Rodando em http://localhost:${PORT}`);
});