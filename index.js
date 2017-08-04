const express = require('express')
const body_parser = require('body-parser')

const app = express()

app.use(body_parser.urlencoded({ extended: false }))
app.use(body_parser.json())

const api = require('./controllers/api.js')


app.use('/api/v1', api)

app.use((req, res, next) => {
  res.status(404).send('404')
})

app.use((err, req, res, next) => {
  res.status(500)
  res.send('Oops, something broke!')
  console.log('Error :o')
})

app.listen(3000, () => {
  console.log('Listening on port 3000')
})
