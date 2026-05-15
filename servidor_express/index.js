import express from "express"
import path from "path"
import morgan from "morgan"
import dotenv from "dotenv"
import bdConexao from "bdConexao"
import alunosRoutes from './src/routers/alunos.js'
import cursosRoutes from './src/routers/cursos.js'
import matriculasRoutes from './src/routers/matriculas.js'
import bdConexao from "./src/config/database.js"

dotenv.config()

const app = express()

const PORT = process.env.PORT || 3000
const HOST = process.env.HOST || "localhost"


app.use(express.json())
app.use(express.urlencoded({extended: true}))

// Rotas da API separadas por especificação
app.use('/alunos', alunosRoutes)
app.use('/cursos', cursosRoutes)
app.use('/matriculas', matriculasRoutes)

app.get ("/", (req, res) => {
    res.sendFile(path.resolve("src", "public", "html", "index.html"))
})

app.get ("/cadastro", (req, res) => {
    res.sendFile(path.resolve("src", "public", "html", "cadastro.html"))
})

app.listen (PORT, HOST, () => {
    console.log(`Servidor em execução em: http://${HOST}:${PORT}`)
})
