const create_config = require('../../../core/config')
const GuestRegistrationPostgres = require('../../../core/repositories/GuestRegistrationPostgres')

var pg            = require('pg');

const config = create_config()
const repo = new GuestRegistrationPostgres(config);
const pool = repo.pool;
const simple_query = "SELECT NOW()"

console.log("config : " + JSON.stringify(config));

/*
test('should execute a simple query', () => {
    pool.query(simple_query, (err, res) => {
        if (err) {
            throw err
        }
        console.log("It's ", res, " now.")
    })
})
*/

/*
test('should execute a simple query', () => {
    pool
        .query(simple_query)
        .then(res => console.log("It's ", res, " now."))
        .catch(err =>
            setImmediate(() => {
                throw err
            })
        )
})
*/

test('should execute a simple query', () => {
    pool.query(simple_query)
        .then(res => {console.log("It's ", res, " now.")})
        .catch();
})
