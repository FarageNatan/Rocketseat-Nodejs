import { Database } from "./database.js"
import { randomUUID } from 'node:crypto'

const database = new Database() //Nesse caso estamos usando os dados salvos em um BD, então eles não vão ser perdidos quando reiniciar a aplicação.

export const routes = [
    {
        method: 'GET',
        path: '/users',
        handler: (req, res) => {
            const users = database.select('users')
        
            return res.end(JSON.stringify(users))
        }
    },
    {
        method: 'POST',
        path: '/users',
        handler: (req, res) => {
            const {name, email} = req.corpoRequisicao
        
            const user = {
                id: randomUUID(),
                name, 
                email,
            } 

            database.insert('users', user)

            return res.writeHead(201).end()
        }
    },
    {
        method: 'DELETE',
        path: '/users/ID',
        handler: (req, res)  => {
            return res.end() 
        },
    }
]