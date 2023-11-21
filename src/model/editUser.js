const mongoose = require("mongoose");
const bcrypt = require("bcrypt")
const {userSchema} = require("./userSchema")
const {dbConnect} = require("./dbConnect")
const User = mongoose.model("User", userSchema)
let con

async function editUser(id, info){
  try {
    info.password = bcrypt.hashSync(info.password, 10)
    con = await dbConnect();
    await User.updateOne({_id: id}, info)
    await con.connection.close();
    return {
      statusCode: 200,
      message: `Usuário ${id} modificado`,
      data: info
    };
  } catch (err) {
    if(con) await con.connection.close();
    if(err.path == "_id") throw {statusCode: 400, message: "Usuário não encontrado"}
    throw err;
  }
}

module.exports = {editUser}