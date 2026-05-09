import express from "express"
import path from "path"

import alunosRoutes from './src/routers/alunos.js'
import cursosRoutes from './src/routers/cursos.js'
import matriculasRoutes from './src/routers/matriculas.js'

const app = express()
const PORT = 3000
const HOST = "localhost"

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
