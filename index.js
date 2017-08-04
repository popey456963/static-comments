const express = require('express')
const path = require('path')
const logger = require('morgan')
const compression = require('compression')
const methodOverride = require('method-override')
const session = require('express-session')
const flash = require('express-flash')
const bodyParser = require('body-parser')
const expressValidator = require('express-validator')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const passport = require('passport')
const MongoStore = require('connect-mongo')(session)

// Load environment variables from .env file
dotenv.load()

// Error Printing
const pe = require('pretty-error').start()
pe.appendStyle({
  'pretty-error > trace > item > footer > addr': {
      display: 'none'
  },
  'pretty-error > trace > item > footer': {
    display: 'block'
  },
  'pretty-error > trace > item': {
    display: 'block',
    marginBottom: 0,
    marginLeft: 2,
    bullet: '"<grey>-</grey>"'
  }
})

// Controllers
const HomeController = require('./controllers/home')
const UserController = require('./controllers/user')
const ContactController = require('./controllers/contact')
const AdminController = require('./controllers/admin')

// Passport OAuth strategies
require('./config/passport')

const app = express()

mongoose.connect(process.env.MONGODB)
mongoose.connection.on('error', function () {
  console.log('MongoDB Connection Error. Please make sure that MongoDB is running.')
  process.exit(1)
})
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')
app.set('port', process.env.PORT || 3000)
app.use(compression())
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(expressValidator())
app.use(methodOverride('_method'))
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}))
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())
app.use(function (req, res, next) {
  res.locals.user = req.user
  next()
})
app.use(express.static(path.join(__dirname, 'public')))
app.use((req, res, next) => {
  if (req.body && req.body.key) req.key = req.body.key
  if (req.params && req.params.key) req.key = req.params.key
  if (req.user && req.user.key) req.key = req.user.key
  next()
})

app.get('/', HomeController.index)
app.get('/contact', ContactController.contactGet)
app.post('/contact', ContactController.contactPost)
app.get('/admin', AdminController.adminGet)
app.get('/account', UserController.ensureAuthenticated, UserController.accountGet)
app.put('/account', UserController.ensureAuthenticated, UserController.accountPut)
app.delete('/account', UserController.ensureAuthenticated, UserController.accountDelete)
app.get('/signup', UserController.signupGet)
app.post('/signup', UserController.signupPost)
app.get('/login', UserController.loginGet)
app.post('/login', UserController.loginPost)
app.get('/forgot', UserController.forgotGet)
app.post('/forgot', UserController.forgotPost)
app.get('/reset/:token', UserController.resetGet)
app.post('/reset/:token', UserController.resetPost)
app.get('/logout', UserController.logout)
app.get('/unlink/:provider', UserController.ensureAuthenticated, UserController.unlink)
app.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email', 'user_location'] }))
app.get('/auth/facebook/callback', passport.authenticate('facebook', { successRedirect: '/', failureRedirect: '/login' }))
app.get('/auth/google', passport.authenticate('google', { scope: 'profile email' }))
app.get('/auth/google/callback', passport.authenticate('google', { successRedirect: '/', failureRedirect: '/login' }))
app.get('/auth/github', passport.authenticate('github', { scope: [ 'user:email profile repo' ] }))
app.get('/auth/github/callback', passport.authenticate('github', { successRedirect: '/', failureRedirect: '/login' }))
app.use((req, res, next) => { let err = new Error(); err.status = 404; next(err) })

// Production error handler
if (app.get('env') === 'production') {
  app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.sendStatus(err.status || 500)
  })
}

app.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'))
})

module.exports = app
