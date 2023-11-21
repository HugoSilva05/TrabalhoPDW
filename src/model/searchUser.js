const mongoose = require("mongoose");
const {userSchema} = require("./userSchema")
const {dbConnect} = require("./dbConnect")
const User = mongoose.model("User", userSchema)
let con

async function searchUser(id){
  try {
    con = await dbConnect();
    response = await User.findById(id);
    await con.connection.close();
    return response;
  } catch (err) {
    await con.connection.close();
    if (err.path == "_id") throw {statusCode: 400, message: "Usuário não encontrado"}
    throw err;
  }
}

module.exports = {searchUser}