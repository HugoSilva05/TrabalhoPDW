const mongoose = require("mongoose");
const {transactionSchema} = require("./transactionSchema")
const {dbConnect} = require("./dbConnect")
const Transaction = mongoose.model("Transaction", transactionSchema)
let con

async function transactionSearch(userID){
  try {
    con = await dbConnect();
    let buyer = []
    let seller = []
    buyer = await Transaction.find({buyerID: userID});
    seller = await Transaction.find({sellerID: userID});
    await con.connection.close();
    return [...buyer, ...seller];
  } catch (err) {
    await con.connection.close();
    if (err.path == "_id") throw {statusCode: 400, message: "Usuário não encontrado"}
    throw err;
  }
}

module.exports = {transactionSearch}