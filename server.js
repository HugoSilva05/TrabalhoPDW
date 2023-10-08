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

//Rota de registro de usuários
app.post("/users/signup", async (req, res) => {
  try {
    const {name, email, password, role, occupation} = req.body //Delimita os campos que podem ser enviados na requisição
    const user = {name, email, password, role, occupation} //Utiliza os campos para um usuário/admin
    let response = await signupControl(user)
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

    const {name, email, password} = req.body //Delimita os campos que podem ser enviados na requisição
    const user = {name, email, password} //Utiliza os campos para um usuário/admin
    
    let response = await loginControl(user)
    res.status(200).send(response)
  } catch (err) {
    res.status(err.status).send(err.message)
  }
})

app.get("/users/logout", async (req, res) => {
  let response = logout()
  res.status(response.status).send(response.message)
})

//Rota de edição de informações do usuário
app.put("/users/:id", async (req, res) => {
  try {
    let id = req.params.id
    const {name, email, password, role, occupation} = req.body //Delimita os campos que podem ser enviados na requisição
    const user = {name, email, password, role, occupation}
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

//Rota para listagem de usuários
app.get("/admin/users", async (req, res) => {
  try {
    let response = await getUsersControl()
    res.status(200).send(response)
  } catch (err) {
    res.status(err.status).send(err.message)
  }
})

app.listen(port, () => {
  console.log("Server running on port " + port)
})