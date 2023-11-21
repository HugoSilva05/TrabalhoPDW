const {getUsers} = require("../model/getUsers")
const {loginControl} = require('./userLoginControl')

async function getUsersControl(){
  try {
    return await getUsers();
  } catch (err) {
    throw err
  }
}

module.exports = {getUsersControl}