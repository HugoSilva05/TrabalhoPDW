const {userSingup, adminSingup} = require("../model/singup")

async function signupControl(user, type){
  const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i

  try {
    if(user.username == undefined || user.username == ""){
      throw {status: 400, message: "Insira um nome"}
    }
    if(user.email == undefined || user.email == ""){
      throw {status: 400, message: "Insira um email"}
    }
    if(!user.email.match(regex)){
      throw {status: 400, message: "Email inválido"}
    }
    if(user.password == undefined || user.password == ""){
      throw {status: 400, message: "Insira uma senha"}
    }

    if(type === 1){
      if(user.occupation === undefined || user.occupation === ""){
        throw {status: 400, message: "Insira o cargo"}
      }
    }
    
    if(type === 0){
      return await userSingup(user)
    }
    if(type === 1){
      return await adminSingup(user)
    }
    
  } catch (err) {
    throw err
  }
}

module.exports = {signupControl}