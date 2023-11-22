require('dotenv').config();
const mongoose = require("mongoose");
const {transactionSchema} = require("./transactionSchema")
const {dbConnect} = require("./dbConnect")
const Transaction = mongoose.model("Transaction", transactionSchema)
let con

async function transactionRegister(transaction){
  try {
    con = await dbConnect();
    let transacao = new Transaction(transaction);
    let response = await transacao.save();
    await con.connection.close();
    return response;
  } catch (err) {
    if(con) await con.connection.close();
    throw err;
  }
}

module.exports = {transactionRegister}