const mongoose = require("mongoose");
const {itemSchema} = require("./itemSchema")
const {dbConnect} = require("./dbConnect")
const Item = mongoose.model("Item", itemSchema)
let con

async function itemSearch(item){
  try {
    con = await dbConnect();
    let byID
    let byAuthor = []
    let byTitle = []
    byID = await Item.findById(item.id);
    byAuthor = await Item.find({author: item.author});
    byTitle = await Item.find({title: item.title});
    await con.connection.close();
    return [byID, ...byAuthor, ...byTitle];
  } catch (err) {
    await con.connection.close();
    if (err.path == "_id") throw {statusCode: 400, message: "Item não encontrado"}
    throw err;
  }
}

module.exports = {itemSearch}