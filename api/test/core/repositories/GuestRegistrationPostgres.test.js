//const create_config = require("../../../core/config")
//const create_db_connection = require("../../../core/repositories")
const GuestRegistrationPostgres = require("../../../core/repositories/GuestRegistrationPostgres")
const {Location, Table, Assign} = require("../../../core/entities")

//const cnf = create_config("development")

// todo: set env var or use 'development' config

describe('Integration test - sequelize postgres db models', () => {

    let postgres;
    const location1 = new Location(4711, "dummy-location")

    beforeAll(() => {
        postgres = new GuestRegistrationPostgres();
    });

    afterAll( () => {
        postgres.close();
    });

    test("should save location to postgres", async () => {

        try {
            const location_saved = await postgres.save_location(location1);
            expect(location_saved).toBeDefined();
            expect(4).not.toBe(3)

        } catch (err) {
            throw err;
        } finally {
            //postgres.connection_close();
        }
    })
})