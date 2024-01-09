// import express from 'express';
// import { v4 } from "uuid";
// import cors from 'cors'

const cors = require('cors');
const express = require('express');
const uuid = require('uuid');
const app = express();
const port = 3001;
app.use(express.json());
app.use(cors()); // aqui esta liberando para qualquer um conumir essa API, em uma aplicação profissional, seria assim: cors(sites autorizados)

/*
    - Query params => meusite.com/users?nome=rodolfo&age=28 FILTROS
    - Route params => /users/2 BUSCAR, DELETAR OU ATUALIZAR ALGO ESPECIFICO
    - Request Body => {"name":"joice", "age":29}

    - GET => Buscar informação no back-end
    - POST => Criar informação no back-end
    - PUT / PATCH => Alterar/Atualizar informações no back-end
    - DELETE => Deletar informação no back-end

    - Middleware => Interceptador => Tem o poder de parar oi alterar dados da requisição
 */

const users = [] // usar assim apena para fins didaticos


// const myFirstMiddleware = (request, response, next) => {
//     console.log("Fui chamado")

//     next()

//     console.log("Finalizamos")
// }
// app.use(myFirstMiddleware)

const checkUserId = (request, response, next) => { // Isso é um middleware, esta sendo usado em put e delete
    const {id} = request.params

    const index = users.findIndex(user => user.id === id) // findeIndex retorna a posição no array

    if(index < 0) {
        return response.status(404).json({error: "User not found"})
    }

    request.userIndex = index
    request.userId = id
    next()
}


app.get('/users', (request, response) => { // estrutura do proprio express

    // const name = request.query.name
    // const age = request.query.age
    // const {name, age} = request.query a mesma coisa que a de cima
    return response.json(users)
})

app.post('/users', (request, response) => { 
    const {name, age} = request.body

    const user = { id:uuid.v4(), name, age} // esse v4 é uma formula que o uuid pede para funcinar (uuid é a biblicoteca intalada para gerar id)

    users.push(user)

    return response.status(201).json(user)
})

app.put('/users/:id', checkUserId, (request, response) => { 
    const {name, age} = request.body
    const index = request.userIndex
    const id = request.userId


    const updateUser = {id, name, age}

    users[index] = updateUser

    return response.json(updateUser)
})

app.delete('/users/:id', checkUserId, (request, response) => { 
    const index = request.userIndex
    
    users.splice(index,1)

    return response.status(204).json()
})


app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})