const mongoose = require("mongoose");
const {itemSchema} = require("./itemSchema")
const {dbConnect} = require("./dbConnect")
const Item = mongoose.model("Item", itemSchema)
let con

async function itemGet(){
  try {
    con = await dbConnect();
    response = await Item.find();
    await con.connection.close();
    return response;
  } catch (err) {
    await con.connection.close();
    throw err;
  }
}

module.exports = {itemGet}