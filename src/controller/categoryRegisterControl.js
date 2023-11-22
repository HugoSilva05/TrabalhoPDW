const {categoryRegister} = require("../model/categoryRegister")

async function categoryRegisterControl(category){
  try {
    if(category.name == undefined || category.name == ""){
      throw {statusCode: 400, message: "Insira um nome"}
    }
    if(category.description == undefined || category.description == ""){
      throw {statusCode: 400, message: "Insira uma descrição"}
    }

    return await categoryRegister(category)
  } catch (err) {
    throw err
  }
}

module.exports = {categoryRegisterControl}