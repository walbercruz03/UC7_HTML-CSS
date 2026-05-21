import bdConexao from '../config/database.js';

// Model: Responsável por interagir com o banco de dados (Regras de Dados)

export const getAllCursos = () => {
    return new Promise((resolve, reject) => {
        bdConexao.query('SELECT * FROM cursos', (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
};

export const createCurso = (cursoData) => {
    return new Promise((resolve, reject) => {
        const { cod, curso, ch, tipo } = cursoData;
        bdConexao.query(
            'INSERT INTO cursos (cod, curso, ch, tipo) VALUES (?, ?, ?, ?)',
            [cod, curso, ch, tipo],
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

// Atualizar os dados do curso no banco (focado em atualizar o nome do curso)
export const updateCurso = (id, cursoData) => {
    return new Promise((resolve, reject) => {
        const { curso } = cursoData;
        bdConexao.query(
            'UPDATE cursos SET curso = ? WHERE cod = ?',
            [curso, id],
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

// Excluir um curso do banco
export const deleteCurso = (id) => {
    return new Promise((resolve, reject) => {
        bdConexao.query(
            'DELETE FROM cursos WHERE cod = ?',
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