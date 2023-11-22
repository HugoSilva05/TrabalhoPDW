const mongoose = require("mongoose");
const {Schema} = mongoose

const categorySchema = new Schema({
  name: {
    type: String,
    required: true
  },  
  description: {
    type: String,
    required: true
  }, 
  status: {
    type: Boolean,
    required: true,
    default: true
  }
}, {collection: "categories", timestamps: true})

module.exports = {categorySchema}