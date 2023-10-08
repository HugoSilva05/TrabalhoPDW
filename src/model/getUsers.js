const mongoose = require("mongoose");
const {userSchema} = require("./userSchema")
const {dbConnect} = require("./dbConnect")
const User = mongoose.model("User", userSchema)
let con

async function getUsers(){
  try {
    con = await dbConnect();
    response = await User.find();
    await con.connection.close();
    return response;
  } catch (err) {
    await con.connection.close();
    throw err;
  }
}

module.exports = {getUsers}