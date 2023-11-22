const mongoose = require("mongoose");
const {itemSchema} = require("./itemSchema")
const {dbConnect} = require("./dbConnect")
const Item = mongoose.model("Item", itemSchema)
let con

async function itemEdit(id, info){
  try {
    con = await dbConnect();
    await Item.updateOne({_id: id}, info)
    await con.connection.close();
    return {
      statusCode: 200,
      message: `Item ${id} modificado`,
      data: info
    };
  } catch (err) {
    if(con) await con.connection.close();
    if(err.path == "_id") throw {statusCode: 400, message: "Item não encontrado"}
    throw err;
  }
}

module.exports = {itemEdit}