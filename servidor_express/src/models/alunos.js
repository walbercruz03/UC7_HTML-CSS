import bdConexao from '../config/database.js';

// Model: Responsável por interagir com o banco de dados
export const getAllAlunos = () => {
    return new Promise((resolve, reject) => {
        bdConexao.query('SELECT * FROM alunos', (err, results) => {
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
            'INSERT INTO alunos (matricula, nome, email, telefone, idCurso_aluno) VALUES (?, ?, ?, ?, ?)',
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

// Atualizar os dados do aluno no banco (focado em atualizar o nome)
export const updateAluno = (id, alunoData) => {
    return new Promise((resolve, reject) => {
        const { nome } = alunoData;
        bdConexao.query(
            'UPDATE alunos SET nome = ? WHERE matricula = ?',
            [nome, id],
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

// Excluir um aluno do banco
export const deleteAluno = (id) => {
    return new Promise((resolve, reject) => {
        bdConexao.query(
            'DELETE FROM alunos WHERE matricula = ?',
            [id],
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