const mongoose = require('mongoose')
const PageSchema = require('./Page')
const UserSchema = require('./User').Schema

const ProjectSchema = mongoose.Schema({
  owner: UserSchema,
  pages: [PageSchema],
  settings: {
    automatic_addition_of_pages: { type: Boolean, default: true },
    require_login: { type: Boolean, default: false }
  }
})

const Project = mongoose.model('Project', ProjectSchema)

module.exports = Project
