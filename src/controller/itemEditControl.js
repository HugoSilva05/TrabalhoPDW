const {itemEdit} = require("../model/itemEdit")

async function itemEditControl(id, info){
  try {
    let editInfos = {}

    if (!(info.title == undefined || info.title == "")) {
      editInfos.title = info.title;
    }
    if (!(info.author == undefined || info.author == "")) {
      editInfos.author = info.author;
    }
    if (!(info.category == undefined || info.category == "")) {
      editInfos.category = info.category;
    }
    if (!(info.price == undefined || info.price == "")) {
      editInfos.price = info.price;
    }
    if (!(info.description == undefined || info.description == "")) {
      editInfos.description = info.description;
    }
    if (!(info.editionDate == undefined || info.editionDate == "")) {
      editInfos.editionDate = info.editionDate;
    }
    if (!(info.periodicity == undefined || info.periodicity == "")) {
      editInfos.periodicity = info.periodicity;
    }
    if (!(info.sellerID == undefined || info.sellerID == "")) {
      editInfos.sellerID = info.sellerID;
    }
  
    return await itemEdit(id, editInfos)
  } catch (err) {
    throw err
  }
}

module.exports = {itemEditControl}