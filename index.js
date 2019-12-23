const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./queries')
const port = 3000
// const usgsGID = '27e15a89-a26f-46e8-b5da-73f505f5793c'

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true
  })
)

app.get('/', (request, response) => {
  response.json({ message6: 'PID Test app with Node.js, Express, and Postgres API' })
})

app.get('/pid/all', db.getPIDs)

app.post('/pid', db.createPID)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})
