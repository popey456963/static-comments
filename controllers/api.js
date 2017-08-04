const express = require('express')
const is_authenticated = require('./authentication.js')

const router = express.Router()


router.get('/', (req, res, next) => {
  res.send('This is the API homepage, eventually it will include information on how to use the API yourself.')
})

// website*, page*
router.get('/getMessages', (req, res, next) => {
  next('error')
})

router.get('/createBoard', is_authenticated, (req, res, next) => {
  
})

// user*, message*
router.post('/postMessage', is_authenticated, (req, res, next) => {

})



module.exports = router
