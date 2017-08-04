const mongoose = require('mongoose')
const UserSchema = require('./User').Schema

const MessageSchema = mongoose.Schema({
  owner: UserSchema,
  message: { type: String, required: true }
})

module.exports = MessageSchema
