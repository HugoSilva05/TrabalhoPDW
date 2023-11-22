const { Schema } = require("mongoose")

const adminSchema = new Schema({
    username: {
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
      required: true,
      default: true
    },
    role: {
      type: Number,
      required: true,
      default: 1
    },
    initDate: {
      type: Date,
      required: true,
      default: new Date()
    },
    occupation: {
      type: String,
      required: true
    }
  }, {collection: "admins", timestamps: true})
  
module.exports = {adminSchema}