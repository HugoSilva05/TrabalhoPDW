const {itemRegister} = require("../model/itemRegister")

async function itemRegisterControl(item){
  try {
    if(item.ID == undefined || item.ID == ""){
      throw {statusCode: 400, message: "Insira um ID"}
    }
    if(item.title == undefined || item.title == ""){
      throw {statusCode: 400, message: "Insira um título"}
    }
    if(item.author == undefined || item.author == ""){
      throw {statusCode: 400, message: "Insira um autor"}
    }
    if(item.category == undefined || item.category == ""){
      throw {statusCode: 400, message: "Insira uma categoria"}
    }
    if(item.price == undefined || item.price == ""){
      throw {statusCode: 400, message: "Insira um preço"}
    }
    if(item.description == undefined || item.description == ""){
      throw {statusCode: 400, message: "Insira uma descrição"}
    }
    if(item.editionDate == undefined || item.editionDate == ""){
      throw {statusCode: 400, message: "Insira a data de edição"}
    }
    if(item.periodicity == undefined || item.periodicity == ""){
      throw {statusCode: 400, message: "Insira a periodicidade"}
    }
    if(item.sellerID == undefined || item.sellerID == ""){
      throw {statusCode: 400, message: "Insira o ID do vendedor"}
    }
    item._id = item.ID

    return await itemRegister(item)
  } catch (err) {
    throw err
  }
}

module.exports = {itemRegisterControl}