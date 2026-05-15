import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();


const bdConexao = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    charset: "utf8mb4",
    multipleStatements: true
});

bdConexao.connect((err) => {
    if(err){
        console.error("Erro ao conectar", err)
        return;
    }
    console.log ("Conectado ao banco de dados MySQL")
})
export default bdConexao;