import { DataTypes } from "sequelize"
import sequelize from "../config/orm.js"

const Curso = sequelize.define('Curso', {
    idCurso: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    code: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    curso: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ch: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    tipo: {
        type: DataTypes.STRING,
        allowNull: false
    }

})

export default Curso