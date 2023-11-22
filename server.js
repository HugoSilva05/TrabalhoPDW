require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const {signupControl} = require('./src/controller/signupControl')
const {loginControl, logout, tokenControl} = require('./src/controller/userLoginControl')
const {adminLoginControl} = require('./src/controller/adminLoginControl')
const {editControl} = require('./src/controller/editControl')
const {delControl} = require('./src/controller/delControl')
const {getUsersControl} = require('./src/controller/getUsersControl')
const {itemRegisterControl} = require('./src/controller/itemRegisterControl')
const {itemGet} = require('./src/model/itemGet')
const {itemEditControl} = require('./src/controller/itemEditControl')
const {itemDelete} = require('./src/model/itemDelete')
const {itemSearch} = require('./src/model/itemSearch')
const {categoryRegisterControl} = require('./src/controller/categoryRegisterControl')
const {categoryGet} = require('./src/model/categoryGet')
const {categoryEditControl} = require('./src/controller/categoryEditControl')
const {categoryDelete} = require('./src/model/categoryDelete')
const {transactionRegisterControl} = require('./src/controller/transactionRegisterControl')


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
    if(err.statusCode) res.status(err.statusCode).send(err)
    else res.status(400).send(err)
    console.log(err)
  }
})

//Rota de autenticação de usuários
app.post("/users/login", async (req, res) => {
  try {
    const {email, password} = req.body //Delimita os campos que podem ser enviados na requisição
    const user = {email, password} //Utiliza os campos para um usuário/admin
    
    let response = await loginControl(user)
    res.status(200).send(response)
  } catch (err) {
    if(err.statusCode) res.status(err.statusCode).send(err)
    else res.status(400).send(err)
    console.log(err)
  }
})

//Rota para logout de usuários
app.post("/users/logout", async (req, res) => {
  let response = logout()
  // res.status(response.status).send(response.message)
})

//Rota de edição de informações do usuário
app.put("/users/:id", async (req, res) => {
  try {
    const tokenHeader = req.headers["authorization"]
    if(!tokenHeader) throw {
      statusCode: 400,
      message: "Token vazio!"
    }
    const token = tokenHeader.split(" ")[1]
    if(!token) throw {
      statusCode: 400,
      message: "Token vazio!"
    }
    tokenControl(token)

    let id = req.params.id
    const {username, email, password} = req.body //Delimita os campos que podem ser enviados na requisição
    const user = {username, email, password}
    let response = await editControl(id, user)
    res.status(200).send(response)
  } catch (err) {
    if(err.statusCode) res.status(err.statusCode).send(err)
    else res.status(400).send(err)
    console.log(err)
  }
})

//Rota de deleção de usuário
app.delete("/users/:id", async (req, res) => {
  try {
    const tokenHeader = req.headers["authorization"]
    if(!tokenHeader) throw {
      statusCode: 400,
      message: "Token vazio!"
    }
    const token = tokenHeader.split(" ")[1]
    if(!token) throw {
      statusCode: 400,
      message: "Token vazio!"
    }
    tokenControl(token)

    let id = req.params.id
    let response = await delControl(id)
    res.status(200).send(response)
  } catch (err) {
    if(err.statusCode) res.status(err.statusCode).send(err)
    else res.status(400).send(err)
    console.log(err)
  }
  
})

//Rota para criação de admins
app.post("/admin/signup", async (req, res) => {
  try {
    const tokenHeader = req.headers["authorization"]
    if(!tokenHeader) throw {
      statusCode: 400,
      message: "Token vazio!"
    }
    const token = tokenHeader.split(" ")[1]
    if(!token) throw {
      statusCode: 400,
      message: "Token vazio!"
    }
    tokenControl(token)

    const {username, email, password, occupation} = req.body //Delimita os campos que podem ser enviados na requisição
    const admin = {username, email, password, occupation} //Utiliza os campos para um usuário/admin
    let response = await signupControl(admin, 1)
    res.status(201).send(response)
  } catch (err) {
    if(err.statusCode) res.status(err.statusCode).send(err)
    else res.status(400).send(err)
    console.log(err)
  }
})

//Rota de autenticação de admins
app.post("/admin/login", async (req, res) => {
  try {
    const {email, password} = req.body //Delimita os campos que podem ser enviados na requisição
    const admin = {email, password} //Utiliza os campos para um usuário/admin
    
    let response = await adminLoginControl(admin)
    res.status(200).send(response)
  } catch (err) {
    if(err.statusCode) res.status(err.statusCode).send(err)
    else res.status(400).send(err)
    console.log(err)
  }
})

//Rota para visualizar relatórios
app.get("/admin/reports", async (req, res) => {
  try {
    
    res.status(200).send(response)
  } catch (err) {
    if(err.statusCode) res.status(err.statusCode).send(err)
    else res.status(400).send(err)
    console.log(err)
  }
})

//Rota para listagem de usuários
app.get("/admin/users", async (req, res) => {
  try {
    const tokenHeader = req.headers["authorization"]
    if(!tokenHeader) throw {
      statusCode: 400,
      message: "Token vazio!"
    }
    const token = tokenHeader.split(" ")[1]
    if(!token) throw {
      statusCode: 400,
      message: "Token vazio!"
    }
    tokenControl(token)

    let response = await getUsersControl()
    res.status(200).send(response)
  } catch (err) {
    if(err.statusCode) res.status(err.statusCode).send(err)
    else res.status(400).send(err)
    console.log(err)
  }
})

//Rota para adição de itens
app.post("/items", async (req, res) => {
  try {
    const tokenHeader = req.headers["authorization"]
    if(!tokenHeader) throw {
      statusCode: 400,
      message: "Token vazio!"
    }
    const token = tokenHeader.split(" ")[1]
    if(!token) throw {
      statusCode: 400,
      message: "Token vazio!"
    }
    tokenControl(token)

    const {ID, title, author, category, price, description, editionDate, periodicity, sellerID} = req.body //Delimita os campos que podem ser enviados na requisição
    const item = {ID, title, author, category, price, description, editionDate, periodicity, sellerID} //Utiliza os campos para um item
    
    let response = await itemRegisterControl(item)

    res.status(200).send(response)
  } catch (err) {
    if(err.statusCode) res.status(err.statusCode).send(err)
    else res.status(400).send(err)
    console.log(err)
  }
})

//Rota para listagem de itens
app.get("/items", async (req, res) => {
  try {
    const tokenHeader = req.headers["authorization"]
    if(!tokenHeader) throw {
      statusCode: 400,
      message: "Token vazio!"
    }
    const token = tokenHeader.split(" ")[1]
    if(!token) throw {
      statusCode: 400,
      message: "Token vazio!"
    }
    tokenControl(token)

    let response = await itemGet()
    
    res.status(200).send(response)
  } catch (err) {
    if(err.statusCode) res.status(err.statusCode).send(err)
    else res.status(400).send(err)
    console.log(err)
  }
})

//Rota para buscar item
app.get("/items/search", async (req, res) => {
  try {
    const tokenHeader = req.headers["authorization"]
    if(!tokenHeader) throw {
      statusCode: 400,
      message: "Token vazio!"
    }
    const token = tokenHeader.split(" ")[1]
    if(!token) throw {
      statusCode: 400,
      message: "Token vazio!"
    }
    tokenControl(token)
    
    const {title, id, author} = req.query //Delimita os campos que podem ser enviados na requisição
    const item = {title, id, author}
    response = await itemSearch(item)
    res.status(200).send(response)
  } catch (err) {
    if(err.statusCode) res.status(err.statusCode).send(err)
    else res.status(400).send(err)
    console.log(err)
  }
})

//Rota para busca de item específico
app.get("/items/:id", async (req, res) => {
  try {
    const tokenHeader = req.headers["authorization"]
    if(!tokenHeader) throw {
      statusCode: 400,
      message: "Token vazio!"
    }
    const token = tokenHeader.split(" ")[1]
    if(!token) throw {
      statusCode: 400,
      message: "Token vazio!"
    }
    tokenControl(token)

    let item = {}
    item.id = req.params.id
    response = await itemSearch(item)
    res.status(200).send(response)
  } catch (err) {
    if(err.statusCode) res.status(err.statusCode).send(err)
    else res.status(400).send(err)
    console.log(err)
  }
})

//Rota para edição de item
app.put("/items/:id", async (req, res) => {
  try {
    const tokenHeader = req.headers["authorization"]
    if(!tokenHeader) throw {
      statusCode: 400,
      message: "Token vazio!"
    }
    const token = tokenHeader.split(" ")[1]
    if(!token) throw {
      statusCode: 400,
      message: "Token vazio!"
    }
    tokenControl(token)

    let id = req.params.id
    const {title, author, category, price, description, editionDate, periodicity, sellerID} = req.body //Delimita os campos que podem ser enviados na requisição
    const item = {title, author, category, price, description, editionDate, periodicity, sellerID}
    response = await itemEditControl(id, item)
    
    res.status(200).send(response)
  } catch (err) {
    if(err.statusCode) res.status(err.statusCode).send(err)
    else res.status(400).send(err)
    console.log(err)
  }
})

//Rota para deleção de item
app.delete("/items/:id", async (req, res) => {
  try {
    const tokenHeader = req.headers["authorization"]
    if(!tokenHeader) throw {
      statusCode: 400,
      message: "Token vazio!"
    }
    const token = tokenHeader.split(" ")[1]
    if(!token) throw {
      statusCode: 400,
      message: "Token vazio!"
    }
    tokenControl(token)

    let id = req.params.id
    response = await itemDelete(id)
    res.status(200).send(response)
  } catch (err) {
    if(err.statusCode) res.status(err.statusCode).send(err)
    else res.status(400).send(err)
    console.log(err)
  }
})

//Rota para registrar nova transação
app.post("/transactions", async (req, res) => {
  try {
    const tokenHeader = req.headers["authorization"]
    if(!tokenHeader) throw {
      statusCode: 400,
      message: "Token vazio!"
    }
    const token = tokenHeader.split(" ")[1]
    if(!token) throw {
      statusCode: 400,
      message: "Token vazio!"
    }
    tokenControl(token)

    const {buyerID, sellerID, itemID, price} = req.body //Delimita os campos que podem ser enviados na requisição
    const item = {buyerID, sellerID, itemID, price}  //Utiliza os campos para uma transação
    
    let response = await transactionRegisterControl(item)
    
    res.status(200).send(response)
  } catch (err) {
    if(err.statusCode) res.status(err.statusCode).send(err)
    else res.status(400).send(err)
    console.log(err)
  }
})

//Rota para visualizar transações de um usuário
app.get("/transactions/:userID", async (req, res) => {
  try {
    
    res.status(200).send(response)
  } catch (err) {
    if(err.statusCode) res.status(err.statusCode).send(err)
    else res.status(400).send(err)
    console.log(err)
  }
})

//Rota para listar categorias
app.get("/categories", async (req, res) => {
  try {
    const tokenHeader = req.headers["authorization"]
    if(!tokenHeader) throw {
      statusCode: 400,
      message: "Token vazio!"
    }
    const token = tokenHeader.split(" ")[1]
    if(!token) throw {
      statusCode: 400,
      message: "Token vazio!"
    }
    tokenControl(token)

    let response = await categoryGet()
    res.status(200).send(response)
  } catch (err) {
    if(err.statusCode) res.status(err.statusCode).send(err)
    else res.status(400).send(err)
    console.log(err)
  }
})

//Rota para adicionar uma categoria
app.post("/categories", async (req, res) => {
  try {
    const tokenHeader = req.headers["authorization"]
    if(!tokenHeader) throw {
      statusCode: 400,
      message: "Token vazio!"
    }
    const token = tokenHeader.split(" ")[1]
    if(!token) throw {
      statusCode: 400,
      message: "Token vazio!"
    }
    tokenControl(token)

    const {name, description} = req.body //Delimita os campos que podem ser enviados na requisição
    const category = {name, description} //Utiliza os campos para uma categoria
    
    let response = await categoryRegisterControl(category)
    res.status(200).send(response)
  } catch (err) {
    if(err.statusCode) res.status(err.statusCode).send(err)
    else res.status(400).send(err)
    console.log(err)
  }
})

//Rota para editar uma categoria
app.put("/categories/:id", async (req, res) => {
  try {
    const tokenHeader = req.headers["authorization"]
    if(!tokenHeader) throw {
      statusCode: 400,
      message: "Token vazio!"
    }
    const token = tokenHeader.split(" ")[1]
    if(!token) throw {
      statusCode: 400,
      message: "Token vazio!"
    }
    tokenControl(token)

    let id = req.params.id
    const {name, description} = req.body //Delimita os campos que podem ser enviados na requisição
    const category = {name, description}
    response = await categoryEditControl(id, category)
    
    res.status(200).send(response)
  } catch (err) {
    if(err.statusCode) res.status(err.statusCode).send(err)
    else res.status(400).send(err)
    console.log(err)
  }
})

//Rota para deletar uma categoria
app.delete("/categories/:id", async (req, res) => {
  try {
    const tokenHeader = req.headers["authorization"]
    if(!tokenHeader) throw {
      statusCode: 400,
      message: "Token vazio!"
    }
    const token = tokenHeader.split(" ")[1]
    if(!token) throw {
      statusCode: 400,
      message: "Token vazio!"
    }
    tokenControl(token)

    let id = req.params.id
    response = await categoryDelete(id)

    res.status(200).send(response)
  } catch (err) {
    if(err.statusCode) res.status(err.statusCode).send(err)
    else res.status(400).send(err)
    console.log(err)
  }
})


app.listen(port, () => {
  console.log("Server running on port " + port)
})