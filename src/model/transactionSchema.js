const mongoose = require("mongoose");
const {Schema} = mongoose

const transactionSchema = new Schema({
  buyerID: {
    type: String,
    required: true
  }, 
  sellerID: {
    type: String,
    required: true
  },
  itemID: {
    type: String,
    required: true
  },
  transactionDate: {
    type: Date,
    required: true,
    default: new Date()
  }, 
  price: {
    type: Number,
    required: true
  }
  
}, {collection: "transactions", timestamps: true})

module.exports = {transactionSchema}