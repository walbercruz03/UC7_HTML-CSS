import http from 'http'
import fs from 'fs'
import queryString from 'querystring'
import { URLSearchParams } from 'url'

const PORTA = 3000
const HOST = 'localhost'

const server = http.createServer((req, res) => {
    // const {url, method} = req //    const url = req.url    const method = req.method
    console.log(req.url, ' - ', req.method)// conferir a requisição - URL e Método
    if(req.url === '/' && req.method === 'GET'){
        res.writeHead(200, {"content-type": 'text/html; charset=utf-8'})
        // res.write()
        res.end('<h1> Página Inicial </h1>')
    }else if(req.url === '/cadastro' && req.method === 'GET'){
         res.writeHead(200, {"content-type": 'text/html; charset=utf-8'})   
        res.end(fs.readFileSync('cadastro.html', 'utf-8'))
    } else if(req.url === '/cursos' && req.method === 'POST'){
        res.writeHead(200, {"content-type": 'text/html; charset=utf-8'})     
        let dados = ''
        req.on('data', chunk => {
            dados += chunk.toString()
        })
        req.on('end', () => {
            const dados_req = queryString.parse(dados) 
            const dados_req1 = URLSearchParams(dados)
            res.write('<h1> Cursos </h1>')          
            res.end(`<h3> Curso: ${dados_req.curso}  </h3>`)
        })
        

    }
    else{
        res.writeHead(404, {"content-type": 'text/html; charset=utf-8'})
        res.end('<h1> Página não localizada! </h1>')
    }


    

})

server.listen(PORTA, HOST,  () => {
    console.log(`Servidor rodando: http://${HOST}:${PORTA}`)
})