//const create_config = require("../../../core/config")
//const create_db_connection = require("../../../core/repositories")
const GuestRegistrationPostgres = require("../../../core/repositories/GuestRegistrationPostgres")
const {eLocation, eTable, eAssign} = require("../../../core/entities")

//const cnf = create_config("development")

// todo: set env var or use 'development' config

describe('Integration test - sequelize postgres db models', () => {

    let postgres;
    const location1 = new eLocation(null, "dummy-loc")

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
            expect(location_saved.name).toBe(location1.name);

        } catch (err) {
            throw err;
        } finally {
            //postgres.connection_close();
        }
    })

    test("should load location with id = 1", async () => {
        try {
            const location_load = await postgres.load_location(1);
            expect(location_load).toBeDefined();
            expect(location_load.name).toBe(location1.name);

        } catch (err) {
            throw err;
        } finally {
            //postgres.connection_close();
        }
    })

    //test("should return an empty list after load from emtpy DB")
})