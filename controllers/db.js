const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/static-comments')

mongoose.connection.on('error', console.error.bind(console, 'connection error:'))
mongoose.connection.once('open', () => { console.log('connected to db') })

const Website = require('../models/Website')

module.exports = Website
