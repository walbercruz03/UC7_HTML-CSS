import express from 'express';
import { listarAlunos, cadastrarAluno } from '../controllers/alunosController.js';

const router = express.Router();

// ROTA: Listar todos os alunos (GET /alunos)
router.get('/', listarAlunos);

// ROTA: Cadastrar um novo aluno (POST /alunos)
router.post('/', cadastrarAluno);

export default router;