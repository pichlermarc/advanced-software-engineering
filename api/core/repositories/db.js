const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'postgres',
  database: 'postgres',
  password: 'postgres',
  port: 5432
});

pool.query('SELECT NOW()', (err, res) => {
  console.log(err, res)
  pool.end()
})

module.exports = {
  query: (text, params, callback) => {
    const start = Date.now()
    return pool.query(text, params, (err, res) => {
      const duration = Date.now() - start
      console.log('executed query', {text, duration, rows: res.rowCount})
      callback(err, res)
    })
  }
}
