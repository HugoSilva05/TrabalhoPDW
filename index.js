const {delUser} = require("./src/model/delUser")
const {delControl} = require("./src/controller/delControl")

async function run() {
  try{
    response = await delControl("6521a4f1e15380d8983146a");
    console.log(response)
  }catch(err){
    console.log(err)
  }
}

run()