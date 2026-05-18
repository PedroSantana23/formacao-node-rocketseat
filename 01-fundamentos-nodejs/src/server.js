import http from 'node:http';
import { json } from './middlewares/json.js';

// - HTTP
//   - Método HTTP
//   - URL

// GET => Buscar um recurso do backend
// POST => Criar um recurso no backend
// PUT => Atualizar um recurso no backend
// PATCH = Atualizar um informação específica de um recurso no backend
// DELETE => Deletar um recurso do backend

// GET    /users/  => Buscando usuários do backend
// POST   /users/  => Criar um usuário no backend

// Stateful  -> informação guardada em memória
// Stateless -> informação salva em dispositivos externos

// Cabeçalhos (Requisição/Resposta) => metadados

const users = []

const server = http.createServer(async (req, res) => {
    const { method, url } = req

    await json(req, res)

    if (method === 'GET' && url === '/users') {
        return res.end(JSON.stringify(users))
    } 

    if (method === 'POST' && url === '/users') {
        const { name, email } = req.body

        users.push({
            id: 1,
            name,
            email,
        })

        return res.writeHead(201).end()
    }

    return res.end('Hello World!')
})

server.listen(3333)