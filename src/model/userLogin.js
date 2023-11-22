require('dotenv').config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const {userSchema} = require("./userSchema")
const {dbConnect} = require("./dbConnect")
const User = mongoose.model("User", userSchema)
let con

async function userLogin(user){
  try {
    con = await dbConnect();
    const usuario = await User.findOne({email: user.email});

    if(!usuario) {
      throw {
        statusCode: 401,
        message: "Usuário não encontrado!",
        data: {
          email: user.email
        }
      }
    }

    const validacao = bcrypt.compareSync(user.password, usuario.password)

    if(!validacao) {
      throw {
        statusCode: 401,
        message: "Senha incorreta"
      }
    }

    await con.connection.close();

    return jwt.sign({email: usuario.email}, process.env.SECRET)
  } catch (err) {
    await con.connection.close();
    throw err;
  }
}

module.exports = {userLogin}