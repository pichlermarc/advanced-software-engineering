/**
 * Integrationtests
 * @group integrationtest
 */

/*const create_config = require('../../../core/config')
const create_connection_pool = require('../../../core/repositories/ConnectionPool')

const config = create_config("development")
const query_maths = "SELECT 2*2 AS \"result\";"
const query_table_does_not_exist = "SELECT * from this_table_does_not_exist;"

const TRANSACTION_BEGIN = "BEGIN";
const TRANSACTION_ROLLBACK = "ROLLBACK";

console.log("config : " + JSON.stringify(config));
*/
describe('Integration test - pg postgres', () => {

    test("dummy", () => {
        expect(4).not.toBe(3)
    })
    /*
    let pgPool;

    beforeAll(() => {
        pgPool = create_connection_pool(config)
    });

    afterAll(async () => {
        await pgPool.end();
        await pgPool._close();
    });



    test('should connect directly to postgres and execute a simple maths query', async () => {
        const client = await pgPool.connect();
        try {
            await client.query(TRANSACTION_BEGIN);

            const {rows} = await client.query(query_maths);
            console.log("result of query \"", query_maths, "\":", rows[0]["result"])
            expect(rows[0]["result"]).toBe(4);

            await client.query(TRANSACTION_ROLLBACK);
        } catch (err) {
            throw err;
        } finally {
            await client.release();
        }
    })

    test('should connect directly to postgres and throw error at attempting to query a not existing table', async () => {
        const client = await pgPool.connect();
        try {
            await client.query(TRANSACTION_BEGIN);
            await client.query(query_table_does_not_exist);
        } catch (err) {
            expect(err).toBeDefined();
            expect(err.toString()).toBe("error: relation \"this_table_does_not_exist\" does not exist");
        } finally {
            await client.query(TRANSACTION_ROLLBACK);
            await client.release();
        }
    })
    */
})