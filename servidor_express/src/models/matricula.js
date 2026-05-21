import { DataTypes } from 'sequelize';
import sequelize from '../config/orm.js';

const Matricula = sequelize.define('Matricula', {
    // Ajuste estes campos conforme o payload JSON que é enviado pelo front-end (req.body)
    aluno_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    curso_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    data_matricula: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
});

export default Matricula;