const UserSchema = require('./User')

const MessageSchema = mongoose.Schema({
  owner: UserSchema,
  message: { type: String, required: true }
})

module.exports = MessageSchema
