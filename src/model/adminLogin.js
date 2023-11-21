require('dotenv').config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const {adminSchema} = require("./adminSchema")
const {dbConnect} = require("./dbConnect")
const Admin = mongoose.model("Admin", adminSchema)
let con

async function adminLogin(admin){
  try {
    con = await dbConnect();
    const administrador = await Admin.findOne({email: admin.email});

    if(!administrador) {
      throw {
        statusCode: 401,
        message: "Administrador não encontrado!",
        data: {
          email: administrador.email
        }
      }
    }

    const validacao = bcrypt.compareSync(admin.password, administrador.password)

    if(!validacao) {
      throw {
        statusCode: 401,
        message: "Senha incorreta"
      }
    }

    await con.connection.close();

    return jwt.sign({email: administrador.email}, process.env.SECRET)
  } catch (err) {
    await con.connection.close();
    throw err;
  }
}

module.exports = {adminLogin}