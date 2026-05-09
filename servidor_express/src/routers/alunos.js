import express from 'express';

const router = express.Router();

// Simulação de banco de dados (em memória)
let alunos = [];

// ROTA: Listar todos os alunos (GET /alunos)
router.get('/', (req, res) => {
    res.json(alunos);
});

// ROTA: Cadastrar um novo aluno (POST /alunos)
router.post('/', (req, res) => {
    const novoAluno = req.body;
    alunos.push(novoAluno);
    res.status(201).json({ mensagem: 'Aluno cadastrado com sucesso!', aluno: novoAluno });
});

export default router;