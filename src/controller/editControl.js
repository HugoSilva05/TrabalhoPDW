const {editUser} = require("../model/editUser")
const {searchUser} = require("../model/searchUser")

async function editControl(id, info){
  const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i
  try {
    await searchUser(id);

    let editInfos = {}

    if(!(info.name == undefined || info.name == "")){
      editInfos.name = info.name
    }
    if(!(info.email == undefined || info.email == "")){
      if(!info.email.match(regex)){
        throw {status: 400, message: "Email inválido"}
      }
      editInfos.email = info.email
    }
    if(!(info.password == undefined || info.password == "")){
      editInfos.password = info.password
    }
    if(!(info.role === undefined || info.role === "")){
      editInfos.role = info.role
    }
    if(info.role == 1){
      if(!(info.occupation === undefined || info.occupation === "")){
        editInfos.occupation = info.occupation
      }
    }

    return await editUser(id, editInfos)
  } catch (err) {
    throw err
  }
}

module.exports = {editControl}