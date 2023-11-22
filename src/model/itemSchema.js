const mongoose = require("mongoose");
const {Schema} = mongoose

const itemSchema = new Schema({
  _id: {
    type: String,
    required: true
  }, 
  title: {
    type: String,
    required: true
  }, 
  author: {
    type: String,
    required: true
  }, 
  category: {
    type: String,
    required: true
  }, 
  price: {
    type: Number,
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
  },
  editionDate: {
    type: Date,
    required: true,
  }, 
  periodicity:{
    type: String,
    required: true,
  }, 
  sellerID: {
    type: String,
    required: true
  }
}, {collection: "items", timestamps: true})

module.exports = {itemSchema}