import http from 'http'
import { json } from './middlewares/json.js'
import { routes } from './routes.js'

//const users = [] -> Caso tente usar um GET localhost:3333/users, antes de utilizar o method POST, vai retornar vazio porque como o estamos salvando os dados em memória, toda vez que a aplicação reiniciar a memória eh jogada fora. Por isso a aplicação stateful é problemática caso colocada em produção porque não podemos perder os dados dos usuários.

//req = request -> recebe os dados enviados pela requisição - res = response -> envia os dados para a requisição
const server = http.createServer(async(req, res) => { 
    const {method, url} = req

    await json(req, res)

    const route = routes.find(route => {
        return route.method == method && route.path == url
    })

    if(route) {
        return route.handler(req, res)
    }
    
    return res.writeHead(404).end('NOT FOUND')
})

server.listen(3333)