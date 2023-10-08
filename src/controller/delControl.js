const {delUser} = require("../model/delUser")
const {searchUser} = require("../model/searchUser")

async function delControl(id){
  try {
    await searchUser(id);
    
    return await delUser(id)
  } catch (err) {
    throw err
  }
}

module.exports = {delControl}