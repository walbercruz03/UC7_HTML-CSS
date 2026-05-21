import express from 'express';
import { listarCursos, cadastrarCurso, atualizarCurso, deletarCurso } from '../controllers/cursosController.js';

const router = express.Router();

// ROTA: Listar todos os cursos (GET /cursos)
router.get('/', listarCursos);

// ROTA: Cadastrar um novo curso (POST /cursos)
router.post('/', cadastrarCurso);

// ROTA: Atualizar informações do curso (PUT /cursos/:id)
router.put('/:id', atualizarCurso);

// ROTA: Excluir um curso (DELETE /cursos/:id)
router.delete('/:id', deletarCurso);

export default router;