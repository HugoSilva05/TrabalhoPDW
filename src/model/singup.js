require('dotenv').config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const {adminSchema} = require("./adminSchema")
const {userSchema} = require("./userSchema")
const {dbConnect} = require("./dbConnect")
const Admin = mongoose.model("Admin", adminSchema)
const User = mongoose.model("User", userSchema)
let con

async function userSingup(user){
  try {
    con = await dbConnect();
    let duplicado = await User.findOne({email: user.email});
    
    if(duplicado) {
      throw {
        statusCode: 400,
        message: "Usuário já existente!",
        data: {
          email: user.email
        }
      }
    }

    let usuario = new User(user);
    let hashedPassword = bcrypt.hashSync(user.password, 10)
    usuario.password = hashedPassword
    let response = await usuario.save();
    await con.connection.close();
    return response;
  } catch (err) {
    if(con) await con.connection.close();
    throw err;
  }
}

async function adminSingup(user){
  try {
    con = await dbConnect();
    let admin = new Admin(user);
    let hashedPassword = bcrypt.hashSync(user.password, 10)
    admin.password = hashedPassword
    let response = await admin.save();
    await con.connection.close();
    return response
  } catch (err) {
    if(con) await con.connection.close();
    throw err;
  }
}

module.exports = {userSingup, adminSingup}