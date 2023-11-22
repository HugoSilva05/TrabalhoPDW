const {categoryEdit} = require("../model/categoryEdit")

async function categoryEditControl(id, info){
  try {
    let editInfos = {}

    if (!(info.name == undefined || info.name == "")) {
      editInfos.name = info.name;
    }
    if (!(info.description == undefined || info.description == "")) {
      editInfos.description = info.description;
    }
  
    return await categoryEdit(id, editInfos)
  } catch (err) {
    throw err
  }
}

module.exports = {categoryEditControl}