require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const {signupControl} = require('./src/controller/signupControl')
const {loginControl, logout, sessionStatus} = require('./src/controller/loginControl')
const {editControl} = require('./src/controller/editControl')
const {delControl} = require('./src/controller/delControl')
const {getUsersControl} = require('./src/controller/getUsersControl')

const app = express();
app.use(bodyParser.json());

let port = process.env.PORT;
if(port == null) port = 8000;

app.get("/", async (req, res) => {
  res.send("Hello World!")
})

//Rota de cadastro de usuários
app.post("/users/signup", async (req, res) => {
  try {
    const {username, email, password} = req.body //Delimita os campos que podem ser enviados na requisição
    const user = {username, email, password}
    let response = await signupControl(user, 0)
    res.status(201).send(response)
  } catch (err) {
    res.status(err.status).send(err.message)
  }
})

//Rota de autenticação de usuários
app.post("/users/login", async (req, res) => {
  try {
    if(sessionStatus()){
      res.status(400).send("Sessão em andamento, deslogue para novo login")
      return
    }

    const {username, email, password} = req.body //Delimita os campos que podem ser enviados na requisição
    const user = {username, email, password} //Utiliza os campos para um usuário/admin
    
    let response = await loginControl(user)
    res.status(200).send(response)
  } catch (err) {
    res.status(err.status).send(err.message)
  }
})

//Rota para logout de usuários
app.post("/users/logout", async (req, res) => {
  let response = logout()
  res.status(response.status).send(response.message)
})

//Rota de edição de informações do usuário
app.put("/users/:id", async (req, res) => {
  try {
    let id = req.params.id
    const {username, email, password} = req.body //Delimita os campos que podem ser enviados na requisição
    const user = {username, email, password}
    let response = await editControl(id, user)
    res.status(200).send(response)
  } catch (err) {
    res.status(err.status).send(err.message)
  }
})

//Rota de deleção de usuário
app.delete("/users/:id", async (req, res) => {
  try {
    let id = req.params.id
    let response = await delControl(id)
    res.status(200).send(response)
  } catch (err) {
    res.status(err.status).send(err.message)
  }
  
})

//Rota para criação de admins
app.post("/admin/signup", async (req, res) => {
  try {
    const {username, email, password, occupation} = req.body //Delimita os campos que podem ser enviados na requisição
    const admin = {username, email, password, occupation} //Utiliza os campos para um usuário/admin
    let response = await signupControl(admin)
    res.status(201).send(response)
  } catch (err) {
    res.status(err.status).send(err.message)
  }
})

//Rota para visualizar relatórios
app.get("/admin/reports", async (req, res) => {
  try {
    
    res.status(200).send(response)
  } catch (err) {
    res.status(err.status).send(err.message)
  }
})

//Rota para listagem de usuários
app.get("/admin/users", async (req, res) => {
  try {
    let response = await getUsersControl()
    res.status(200).send(response)
  } catch (err) {
    res.status(err.status).send(err.message)
  }
})

//Rota para listagem de itens
app.get("/items", async (req, res) => {
  try {
    
    res.status(200).send(response)
  } catch (err) {
    res.status(err.status).send(err.message)
  }
})

//Rota para listagem de item específico
app.get("/items/:id", async (req, res) => {
  try {
    
    res.status(200).send(response)
  } catch (err) {
    res.status(err.status).send(err.message)
  }
})

//Rota para edição de item
app.put("/items/:id", async (req, res) => {
  try {
    
    res.status(200).send(response)
  } catch (err) {
    res.status(err.status).send(err.message)
  }
})

//Rota para deleção de item
app.delete("/items/:id", async (req, res) => {
  try {
    
    res.status(200).send(response)
  } catch (err) {
    res.status(err.status).send(err.message)
  }
})

//Rota para buscar item
app.get("/items/search", async (req, res) => {
  try {
    
    res.status(200).send(response)
  } catch (err) {
    res.status(err.status).send(err.message)
  }
})

//Rota para registrar nova transação
app.post("/transactions", async (req, res) => {
  try {
    
    res.status(200).send(response)
  } catch (err) {
    res.status(err.status).send(err.message)
  }
})

//Rota para visualizar transações de um usuário
app.get("/transactions/:userID", async (req, res) => {
  try {
    
    res.status(200).send(response)
  } catch (err) {
    res.status(err.status).send(err.message)
  }
})

//Rota para listar categorias
app.get("/categories", async (req, res) => {
  try {
    
    res.status(200).send(response)
  } catch (err) {
    res.status(err.status).send(err.message)
  }
})

//Rota para adicionar uma categoria
app.post("/categories", async (req, res) => {
  try {
    
    res.status(200).send(response)
  } catch (err) {
    res.status(err.status).send(err.message)
  }
})

//Rota para editar uma categoria
app.put("/categories/:id", async (req, res) => {
  try {
    
    res.status(200).send(response)
  } catch (err) {
    res.status(err.status).send(err.message)
  }
})

//Rota para deletar uma categoria
app.delete("/categories/:id", async (req, res) => {
  try {
    
    res.status(200).send(response)
  } catch (err) {
    res.status(err.status).send(err.message)
  }
})


app.listen(port, () => {
  console.log("Server running on port " + port)
})