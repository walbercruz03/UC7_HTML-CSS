import * as CursoModel from '../models/cursos.js';

// Controller: Responsável pela validação e processamento das regras de negócio

export const listarCursos = async (req, res) => {
    try {
        const cursos = await CursoModel.getAllCursos();
        res.status(200).json(cursos);
    } catch (erro) {
        console.error("Erro ao listar cursos:", erro);
        res.status(500).json({ erro: 'Erro interno ao buscar os cursos.' });
    }
};

export const cadastrarCurso = async (req, res) => {
    const { cod, curso, ch, tipo } = req.body;

    // Regras de Negócio e Validação
    if (!curso || curso.trim().length < 3) {
        return res.status(400).json({ 
            erro: 'Falha no cadastro! O nome do curso é obrigatório e deve ter no mínimo 3 caracteres.' 
        });
    }

    if (!cod || isNaN(cod) || !ch || isNaN(ch) || !tipo) {
        return res.status(400).json({ 
            erro: 'Falha no cadastro! Os campos cod, ch (carga horária) e tipo são obrigatórios e os numéricos devem ser válidos.' 
        });
    }

    try {
        // Processamento: Pede ao Model para salvar no banco
        const resultado = await CursoModel.createCurso({ cod, curso, ch, tipo });
        res.status(201).json({ mensagem: 'Curso cadastrado com sucesso!', id: resultado.insertId });
    } catch (erro) {
        console.error("Erro ao cadastrar curso:", erro);
        res.status(500).json({ erro: 'Erro interno ao salvar o curso no banco de dados.' });
    }
};