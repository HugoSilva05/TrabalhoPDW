require('dotenv').config();
const mongoose = require("mongoose");
const {itemSchema} = require("./itemSchema")
const {dbConnect} = require("./dbConnect")
const Item = mongoose.model("Item", itemSchema)
let con

async function itemRegister(item){
  try {
    con = await dbConnect();
    let element = new Item(item);
    let response = await element.save();
    await con.connection.close();
    return response;
  } catch (err) {
    if(con) await con.connection.close();
    throw err;
  }
}

module.exports = {itemRegister}