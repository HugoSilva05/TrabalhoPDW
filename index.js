require('dotenv').config();
const {login} = require("./src/model/login")
const bcrypt = require("bcrypt")

async function run() {
  try{
    let user = {
      "email": "hugo@teste.com",
      "password": "hugold"
    }

    let response = bcrypt.hashSync(user.password, Number.parseInt(process.env.SECRET))

    // response = await login(user);
    console.log(response)
  }catch(err){
    console.log(err)
  }
}

run()