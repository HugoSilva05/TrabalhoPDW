const mongoose = require("mongoose");
const {categorySchema} = require("./categorySchema")
const {dbConnect} = require("./dbConnect")
const Category = mongoose.model("Category", categorySchema)
let con

async function categoryDelete(id){
  try {
    con = await dbConnect();
    response = await Category.updateOne({_id: id}, {status: false})
    await con.connection.close();
    return response;
  } catch (err) {
    if(con) await con.connection.close();
    if (err.path == "_id") throw {statusCode: 400, message: "Categoria não encontrado"}
    throw err;
  }
}

module.exports = {categoryDelete}