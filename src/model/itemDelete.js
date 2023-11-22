const mongoose = require("mongoose");
const {itemSchema} = require("./itemSchema")
const {dbConnect} = require("./dbConnect")
const Item = mongoose.model("Item", itemSchema)
let con

async function itemDelete(id){
  try {
    con = await dbConnect();
    response = await Item.updateOne({_id: id}, {status: false})
    await con.connection.close();
    return response;
  } catch (err) {
    if(con) await con.connection.close();
    if (err.path == "_id") throw {statusCode: 400, message: "Item não encontrado"}
    throw err;
  }
}

module.exports = {itemDelete}