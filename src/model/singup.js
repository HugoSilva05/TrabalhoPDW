const mongoose = require("mongoose");
const {adminSchema} = require("./adminSchema")
const {userSchema} = require("./userSchema")
const {dbConnect} = require("./dbConnect")
const Admin = mongoose.model("Admin", adminSchema)
const User = mongoose.model("User", userSchema)
let con

async function userSingup(user){
  try {
    let usuario = new User(user);
    usuario.status = true
    usuario.role = 0
    con = await dbConnect();
    let response = await usuario.save();
    await con.connection.close();
    return response;
  } catch (err) {
    await con.connection.close();
    throw err;
  }
}

async function adminSingup(user){
  try {
    let admin = new Admin(user);
    admin.status = true
    admin.role = 1
    admin.initDate = new Date()
    con = await dbConnect();
    let response = await admin.save();
    await con.connection.close();
    return response
  } catch (err) {
    await con.connection.close();
    throw err;
  }
}

module.exports = {userSingup, adminSingup}