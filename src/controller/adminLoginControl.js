require('dotenv').config();
const jwt = require("jsonwebtoken")
const {adminLogin} = require("../model/adminLogin")

async function adminLoginControl(user){
  try {
    if((user.email == undefined || user.email == "")){
      throw {
        statusCode: 400, 
        message: "Insira um email"
      }
    }

    if(user.password == undefined || user.password == ""){
      throw {
        statusCode: 400, 
        message: "Insira uma senha"
      }
    }

    let token = await adminLogin(user)

    return {
      statusCode: 200,
      message: "Login realizado com sucesso!",
      data: {
        token
      }
    };
  } catch (err) {
    throw err;
  }
}

function logout(){
  
}

function tokenControl(token){
  try {
    return jwt.verify(token, process.env.SECRET)
  } catch (err) {
    throw {
      statusCode: 400,
      message: "Token inválido!"
    }
  }
}

module.exports = {adminLoginControl, logout, tokenControl}