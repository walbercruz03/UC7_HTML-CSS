import express from 'express';

const router = express.Router();

// Simulação de banco de dados (em memória)
let matriculas = [];

// ROTA: Listar todas as matrículas (GET /matriculas)
router.get('/', (req, res) => {
    res.json(matriculas);
});

// ROTA: Criar uma nova matrícula (POST /matriculas)
router.post('/', (req, res) => {
    const novaMatricula = req.body;
    matriculas.push(novaMatricula);
    res.status(201).json({ mensagem: 'Matrícula realizada com sucesso!', matricula: novaMatricula });
});

export default router;