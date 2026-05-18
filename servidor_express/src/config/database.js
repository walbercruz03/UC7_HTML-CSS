import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();


const bdConexao = mysql.createConnection({
    host: '127.0.0.1', // Forçando o IP em vez de 'localhost' para evitar o erro GSSAPI
    port: process.env.DATABASE_PORT || 3306,
    user: process.env.DATABASE_USER || 'root',
    password: process.env.DATABASE_PASSWORD || '', // Coloque a senha do seu banco aqui, caso tenha
    database: process.env.DATABASE_NAME || 'bd_academico',
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