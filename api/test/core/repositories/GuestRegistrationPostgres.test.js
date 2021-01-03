const create_config = require('../../../core/config')
const create_connection_pool = require('../../../core/repositories/ConnectionPool')
const GuestRegistrationPostgres = require('../../../core/repositories/GuestRegistrationPostgres')

const config = create_config()
const repo = new GuestRegistrationPostgres(config);
const pool = repo.pool;
const query_time = "SELECT NOW();"
const query_math = "SELECT 2*2 AS \"result\";"

console.log("config : " + JSON.stringify(config));

/*
test('should execute a simple query', () => {
    pool.query(query_time, (err, res) => {
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
        .query(query_time)
        .then(res => console.log("It's ", res, " now."))
        .catch(err =>
            setImmediate(() => {
                throw err
            })
        )
})
*/

/*test('should execute a simple query', () => {
    pool.query(query_time)
        .then(res => {console.log("It's ", res, " now.")})
        .catch();
})*/
/*
test('should execute a simple query - promises', () => {
    pool.query(query_math)
        .then(res => {console.log("It's ", res, " now.")})
        .catch(e => {console.error(e)});
})
*/

describe('testing postgres', () => {

    let pgPool;

    beforeAll(() => {
        pgPool = create_connection_pool(config)
    });

    afterAll(async () => {
        await pgPool.end();
    });

    it('should test', async () => {
        const client = await pgPool.connect();
        try {
            await client.query('BEGIN');

            const { rows } = await client.query(query_math);
            console.log("result of query \"", query_math, "\":", rows[0]["result"])
            expect(rows[0]["result"]).toBe(4);

            await client.query('ROLLBACK');
        } catch(err) {
            throw err;
        } finally {
            client.release();
        }

    })

});
