const { Schema } = require("mongoose")

const adminSchema = new Schema({
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    status: {
      type: Boolean,
      required: true
    },
    role: {
      type: Number,
      required: true
    },
    initDate: {
      type: Date,
      required: true
    },
    occupation: {
      type: String,
      required: true
    }
  }, {collection: "users", timestamps: true})
  
module.exports = {adminSchema}