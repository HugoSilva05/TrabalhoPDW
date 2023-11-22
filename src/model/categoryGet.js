const mongoose = require("mongoose");
const {categorySchema} = require("./categorySchema")
const {dbConnect} = require("./dbConnect")
const Category = mongoose.model("Category", categorySchema)
let con

async function categoryGet(){
  try {
    con = await dbConnect();
    response = await Category.find();
    await con.connection.close();
    return response;
  } catch (err) {
    await con.connection.close();
    throw err;
  }
}

module.exports = {categoryGet}