import express from 'express';
import { listarCursos, cadastrarCurso } from '../controllers/cursosController.js';

const router = express.Router();

// ROTA: Listar todos os cursos (GET /cursos)
router.get('/', listarCursos);

// ROTA: Cadastrar um novo curso (POST /cursos)
router.post('/', cadastrarCurso);

export default router;