import express from 'express';
import Matricula from '../models/matricula.js';

const router = express.Router();

// ROTA: Listar todas as matrículas (GET /matriculas)
router.get('/', async (req, res) => {
    try {
        const matriculas = await Matricula.findAll();
        res.json(matriculas);
    } catch (erro) {
        console.error("Erro ao listar matrículas:", erro);
        res.status(500).json({ erro: 'Erro interno ao buscar as matrículas no banco de dados.' });
    }
});

// ROTA: Criar uma nova matrícula (POST /matriculas)
router.post('/', async (req, res) => {
    try {
        // O Sequelize usa os dados do body para criar uma nova linha na tabela
        const novaMatricula = await Matricula.create(req.body);
        res.status(201).json({ mensagem: 'Matrícula realizada com sucesso!', matricula: novaMatricula });
    } catch (erro) {
        console.error("Erro ao cadastrar matrícula:", erro);
        res.status(500).json({ erro: 'Erro interno ao salvar a matrícula no banco de dados.' });
    }
});

export default router;