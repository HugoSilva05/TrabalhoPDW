require('dotenv').config();
const mongoose = require("mongoose");
const {categorySchema} = require("./categorySchema")
const {dbConnect} = require("./dbConnect")
const Category = mongoose.model("Category", categorySchema)
let con

async function categoryRegister(category){
  try {
    con = await dbConnect();
    let categoria = new Category(category);
    let response = await categoria.save();
    await con.connection.close();
    return response;
  } catch (err) {
    if(con) await con.connection.close();
    throw err;
  }
}

module.exports = {categoryRegister}