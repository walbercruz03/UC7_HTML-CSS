import express from "express"
import path from "path"

const app = express()
const PORT = 3000
const HOST = "localhost"

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get ("/", (req, res) => {
    res.send("<h1> Pagina Inicial </h1>")
})

app.get ("/cadastro", (req, res) => {
    res.sendFile(path.resolve("cadastro.html"))
})

app.listen (PORT, HOST, () => {
    console.log(`Servidor em execução em: http://${HOST}:${PORT}`)
})

