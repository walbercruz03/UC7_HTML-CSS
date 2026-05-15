import bdConexao from '../config/database.js';

// Model: Responsável por interagir com o banco de dados
export const getAllAlunos = () => {
    return new Promise((resolve, reject) => {
        bdConexao.query('SELECT * FROM aluno', (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
};

export const createAluno = (alunoData) => {
    return new Promise((resolve, reject) => {
        const { matricula, nome, email, telefone, idCurso_aluno } = alunoData;
        bdConexao.query(
            'INSERT INTO aluno (matricula, nome, email, telefone, idCurso_aluno) VALUES (?, ?, ?, ?, ?)',
            [matricula, nome, email, telefone, idCurso_aluno],
            (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            }
        );
    });
};