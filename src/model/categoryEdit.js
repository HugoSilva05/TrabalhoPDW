const mongoose = require("mongoose");
const {categorySchema} = require("./categorySchema")
const {dbConnect} = require("./dbConnect")
const Category = mongoose.model("Category", categorySchema)
let con

async function categoryEdit(id, info){
  try {
    con = await dbConnect();
    await Category.updateOne({_id: id}, info)
    await con.connection.close();
    return {
      statusCode: 200,
      message: `Categoria ${id} modificada`,
      data: info
    };
  } catch (err) {
    if(con) await con.connection.close();
    if(err.path == "_id") throw {statusCode: 400, message: "Categoria não encontrado"}
    throw err;
  }
}

module.exports = {categoryEdit}