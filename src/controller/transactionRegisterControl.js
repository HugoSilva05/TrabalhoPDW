const {transactionRegister} = require("../model/transactionRegister")

async function transactionRegisterControl(transaction){
  try {
    if(transaction.buyerID == undefined || transaction.buyerID == ""){
      throw {statusCode: 400, message: "Insira o ID do comprador"}
    }
    if(transaction.sellerID == undefined || transaction.sellerID == ""){
      throw {statusCode: 400, message: "Insira o ID do vendedor"}
    }
    if(transaction.itemID == undefined || transaction.itemID == ""){
      throw {statusCode: 400, message: "Insira o ID do item"}
    }
    if(transaction.price == undefined || transaction.price == ""){
      throw {statusCode: 400, message: "Insira o valor da transação"}
    }
    
    return await transactionRegister(transaction)
  } catch (err) {
    throw err
  }
}

module.exports = {transactionRegisterControl}