const mongoose = require("mongoose");
const {Schema} = mongoose

const userSchema = new Schema({
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
    default: 0
  }
}, {collection: "users", timestamps: true})

module.exports = {userSchema}