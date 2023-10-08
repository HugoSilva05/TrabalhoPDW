const {login} = require("../model/login")
let loggedUser = {}
let session = false

async function loginControl(user){
  if(session){
    return loggedUser;
  }else{
    try {
      if(user.password == undefined || user.password == ""){
        throw {status: 400, message: "Insira uma senha"}
      }
      if((user.name == undefined || user.name == "") && (user.email == undefined || user.email == "")){
        throw {status: 400, message: "Insira um email ou um nome"}
      }
      let trylog = []
      trylog = await login({email: user.email})
      if(trylog.length == 0) trylog = await login({name: user.name})
  
      if(trylog.length == 0){
        throw {status: 401, message: "Usuário não encontrado"}
      }
  
      trylog = await login({email: user.email, password: user.password})
      if(trylog.length == 0) trylog = await login({name: user.name, password: user.password})
  
      if(trylog.length == 0){
        throw {status: 401, message: "Senha incorreta"}
      }
  
      let logged = []
  
      logged = trylog.filter(log => {
        if(log.role === 1) return log
      })
  
      if(logged.length == 0){
        logged = trylog
      }
  
      loggedUser = logged[0]
      session = true
      return loggedUser
    } catch (err) {
      throw err;
    }
  }
}

function logout(){
  if(session) {
    session = false
    return {status: 200, message: "Usuário deslogado com sucesso"}
  }else {
    return {status: 400, message: "Não há usuário para ser deslogado"}
  }
}

function sessionStatus(){
  return session
}

module.exports = {loginControl, logout, sessionStatus}