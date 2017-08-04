const PageSchema = require('./Page')
const UserSchema = require('./User')

const WebsiteSchema = mongoose.Schema({
  owner: UserSchema,
  pages: [PageSchema],
  settings: {
    automatic_addition_of_pages: { type: Boolean, default: true },
    require_login: { type: Boolean, default: false }
  }
})

const Website = mongoose.model('Website', WebsiteSchema)
