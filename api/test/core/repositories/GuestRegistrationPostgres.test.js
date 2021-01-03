const create_config = require('../../../core/config')
const create_connection_pool = require('../../../core/repositories/ConnectionPool')
const GuestRegistrationPostgres = require('../../../core/repositories/GuestRegistrationPostgres')

const config = create_config()
//const repo = new GuestRegistrationPostgres(config);
const query_maths = "SELECT 2*2 AS \"result\";"
const query_not_exists = "select * from this_table_does_not_exist;"

const TRANSACTION_BEGIN = "BEGIN";
const TRANSACTION_ROLLBACK = "ROLLBACK";

console.log("config : " + JSON.stringify(config));

let pgPool;

beforeAll(() => {
    pgPool = create_connection_pool(config)
});

afterAll(async () => {
    await pgPool.end();
});


test('should query simple maths', async () => {
    const client = await pgPool.connect();
    try {
        await client.query(TRANSACTION_BEGIN);

        const { rows } = await client.query(query_maths);
        console.log("result of query \"", query_maths, "\":", rows[0]["result"])
        expect(rows[0]["result"]).toBe(4);

        await client.query(TRANSACTION_ROLLBACK);
    } catch(err) {
        throw err;
    } finally {
        await client.release();
    }
})

test('should throw error if query not existing table', async () => {
    const client = await pgPool.connect();
    try {
        await client.query(TRANSACTION_BEGIN);
        const { rows } = await client.query(query_not_exists);
    } catch(err) {
        expect(err).toBeDefined();
        expect(err.toString()).toBe("error: relation \"this_table_does_not_exist\" does not exist");
    } finally {
        await client.query(TRANSACTION_ROLLBACK);
        await client.release();
    }
})