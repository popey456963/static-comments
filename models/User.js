const crypto = require('crypto')
const bcrypt = require('bcrypt-nodejs')
const mongoose = require('mongoose')
const rand = require('random-key')

const schemaOptions = {
  timestamps: true,
  toJSON: {
    virtuals: true
  }
}

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true},
  key: String,
  password: String,
  passwordResetToken: String,
  passwordResetExpires: Date,
  location: String,
  website: String,
  picture: String,
  facebook: String,
  google: String,
  github: String,
}, schemaOptions)

userSchema.pre('save', function (next) {
  const user = this
  if (!user.key) user.key = rand.generate()
  if (!user.isModified('password')) { return next() }
  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(user.password, salt, null, function (err, hash) {
      user.password = hash
      next()
    })
  })
})

userSchema.methods.comparePassword = function (password, cb) {
  bcrypt.compare(password, this.password, function (err, isMatch) {
    cb(err, isMatch)
  })
}

userSchema.virtual('gravatar').get(function () {
  if (!this.get('email')) {
    return 'https://gravatar.com/avatar/?s=200&d=retro'
  }
  const md5 = crypto.createHash('md5').update(this.get('email')).digest('hex')
  return 'https://gravatar.com/avatar/' + md5 + '?s=200&d=retro'
})

userSchema.options.toJSON = {
  transform: function (doc, ret, options) {
    delete ret.password
    delete ret.passwordResetToken
    delete ret.passwordResetExpires
  }
}

const User = mongoose.model('User', userSchema)

module.exports = { Schema: userSchema, Model: User }
