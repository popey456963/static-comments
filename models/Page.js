const mongoose = require('mongoose')
const MessageSchema = require('./Message')
const UserSchema = require('./User').Schema

const PageSchema = mongoose.Schema({
  owner: UserSchema,
  page_name: { type: String, required: true },
  messages: [MessageSchema]
})

module.exports = PageSchema
