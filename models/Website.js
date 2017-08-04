const mongoose = require('mongoose')
const PageSchema = require('./Page')
const UserSchema = require('./User').Schema

const WebsiteSchema = mongoose.Schema({
  owner: UserSchema,
  pages: [PageSchema],
  settings: {
    automatic_addition_of_pages: { type: Boolean, default: true },
    require_login: { type: Boolean, default: false }
  }
})

const Website = mongoose.model('Website', WebsiteSchema)

module.exports = Website
