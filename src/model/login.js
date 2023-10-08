const mongoose = require("mongoose");
const {userSchema} = require("./userSchema")
const {dbConnect} = require("./dbConnect")
const User = mongoose.model("User", userSchema)
let con

async function login(user){
  try {
    con = await dbConnect();
    let response = await User.find(user);
    await con.connection.close();
    return response;
  } catch (err) {
    await con.connection.close();
    throw err;
  }
}

module.exports = {login}