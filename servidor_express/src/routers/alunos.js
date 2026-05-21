import express from 'express';
import { listarAlunos, cadastrarAluno, atualizarAluno, deletarAluno } from '../controllers/alunosController.js';

const router = express.Router();

// ROTA: Listar todos os alunos (GET /alunos)
router.get('/', listarAlunos);

// ROTA: Cadastrar um novo aluno (POST /alunos)
router.post('/', cadastrarAluno);

// ROTA: Atualizar informações do aluno (PUT /alunos/:id)
router.put('/:id', atualizarAluno);

// ROTA: Excluir um aluno (DELETE /alunos/:id)
router.delete('/:id', deletarAluno);

export default router;