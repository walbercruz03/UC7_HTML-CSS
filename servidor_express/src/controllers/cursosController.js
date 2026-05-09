// Simulação de banco de dados (em memória)
let cursos = [];

export const listarCursos = (req, res) => {
    res.json(cursos);
};

export const cadastrarCurso = (req, res) => {
    const novoCurso = req.body;

    // Verificação: checa se os dados essenciais (ex: nome) foram enviados
    if (!novoCurso || !novoCurso.nome) {
        return res.status(400).json({ 
            erro: 'Falha no cadastro! O nome do curso é obrigatório.' 
        });
    }

    // Se passou na verificação, cadastra o curso
    cursos.push(novoCurso);
    res.status(201).json({ mensagem: 'Curso cadastrado com sucesso!', curso: novoCurso });
};