const uuidv4 = require('uuid/v4')
const moment = require('moment')
const Pool = require('pg').Pool
const pool = new Pool({
  user: 'app_pid',
  host: 'localhost',
  database: 'pid',
  password: 'password',
  port: 5432
})

const getPIDs = (request, response) => {
  pool.query('SELECT * FROM pid ORDER BY created DESC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createPID = (request, response) => {
  const { title, purl } = request.body
  const now = moment().format()
  pool.query('INSERT INTO pid (title, purl, username, pid, created, modified ) VALUES ($1, $2, $3, $4, $5, $6)', [title, purl, 'jasmith@contractor.usgs.gov', uuidv4(), now, now], (error, results) => {
    if (error) {
      response.status(500).send('Problem adding PID: ' + error)
      throw error
    }
    response.status(201).send(results.rows[0])
    // response.status(201).send(`PID added: ${results.pid}`)
    // response.status(201).send('PID ' + results.pid + ' added')
    // response.status(201).json(results.insertId)
  })
}

module.exports = {
  getPIDs,
  createPID
}
