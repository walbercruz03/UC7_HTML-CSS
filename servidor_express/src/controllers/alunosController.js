import * as AlunoModel from '../models/alunos.js';

// Controller: Validação e regras de negócio para Alunos
export const listarAlunos = async (req, res) => {
    try {
        const alunos = await AlunoModel.getAllAlunos();
        res.status(200).json(alunos);
    } catch (erro) {
        console.error("Erro ao listar alunos:", erro);
        res.status(500).json({ erro: 'Erro interno ao buscar os alunos.' });
    }
};

export const cadastrarAluno = async (req, res) => {
    // DEBUG: Mostra no terminal o que chegou do Front-End
    console.log("Dados recebidos no backend:", req.body);

    const { nome, email, telefone, idCurso_aluno } = req.body;

    // Gera a matrícula automaticamente (Ano atual + 4 dígitos aleatórios)
    const anoAtual = new Date().getFullYear();
    const numeroAleatorio = Math.floor(1000 + Math.random() * 9000);
    const matricula = `${anoAtual}${numeroAleatorio}`;

    // Regras de validação para TODOS os campos exigidos pelo Banco de Dados
    if (!nome || nome.trim().length < 3) {
        return res.status(400).json({ erro: 'Falha no cadastro! Nome (min 3 chars) é obrigatório.' });
    }
    if (!email || !email.includes('@')) {
        return res.status(400).json({ erro: 'Falha no cadastro! Email inválido ou obrigatório.' });
    }
    if (!telefone) {
        return res.status(400).json({ erro: 'Falha no cadastro! Telefone é obrigatório.' });
    }
    if (!idCurso_aluno || isNaN(idCurso_aluno)) {
        return res.status(400).json({ erro: 'Falha no cadastro! O ID do curso é obrigatório e deve ser numérico.' });
    }

    try {
        const resultado = await AlunoModel.createAluno({ matricula, nome, email, telefone, idCurso_aluno });
        res.status(201).json({ 
            mensagem: `Aluno cadastrado com sucesso! Matrícula: ${matricula}`, 
            id: resultado.insertId,
            matricula: matricula 
        });
    } catch (erro) {
        console.error("Erro ao cadastrar aluno:", erro);
        res.status(500).json({ erro: 'Erro interno ao salvar o aluno no banco. Verifique se o idCurso_aluno existe na tabela de cursos.' });
    }
};

export const atualizarAluno = async (req, res) => {
    const { id } = req.params;
    const dadosAtualizados = req.body;

    try {
        await AlunoModel.updateAluno(id, dadosAtualizados);
        res.status(200).json({ mensagem: 'Aluno atualizado com sucesso!' });
    } catch (erro) {
        console.error("Erro ao atualizar aluno:", erro);
        res.status(500).json({ erro: 'Erro interno ao atualizar o aluno no banco.' });
    }
};

export const deletarAluno = async (req, res) => {
    const { id } = req.params;

    try {
        await AlunoModel.deleteAluno(id);
        res.status(200).json({ mensagem: 'Aluno deletado com sucesso!' });
    } catch (erro) {
        console.error("Erro ao deletar aluno:", erro);
        res.status(500).json({ erro: 'Erro interno ao deletar o aluno no banco.' });
    }
};