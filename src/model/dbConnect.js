require('dotenv').config();
const mongoose = require("mongoose");
const {adminSchema} = require("./adminSchema")
const {userSchema} = require("./userSchema")

async function dbConnect(){
  try{
    await mongoose.connect(
      `mongodb+srv://hugold:nR0VdnnummG3Uxhc@projetopdw.26j89uu.mongodb.net/ProjetoSemestral?retryWrites=true`
    );

    return mongoose
  }catch(err){
    throw err
  }
}

module.exports = {dbConnect}
