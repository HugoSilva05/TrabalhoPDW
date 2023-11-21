const {getUsers} = require("../model/getUsers")
const {loginControl, sessionStatus} = require('./userLoginControl')

async function getUsersControl(){
  try {
    if(sessionStatus()){
      let user = await loginControl();

      if(user.role > 0){
        return await getUsers();
      }else{
        throw {status: 401, message: "Login Administrador Necessário"}
      }
    }else{
      throw {status: 400, message: "Login Administrador Necessário"}
    }
  } catch (err) {
    throw err
  }
}

module.exports = {getUsersControl}