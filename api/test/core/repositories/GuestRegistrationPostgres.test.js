//const create_config = require("../../../core/config")
//const create_db_connection = require("../../../core/repositories")
const GuestRegistrationPostgres = require("../../../core/repositories/GuestRegistrationPostgres")
const {eLocation, eTable, eAssign} = require("../../../core/entities")

//const cnf = create_config("development")

// todo: set env var or use 'development' config

describe('Integration test - sequelize postgres db models', () => {

    let postgres;
    const location1 = new eLocation()

    beforeAll(() => {
        postgres = new GuestRegistrationPostgres();
    });

    afterAll( () => {
        postgres.close();
    });

    test("should save location to postgres", async () => {

        try {
            //const location_saved = await postgres.save_location(location1);
            const location_saved = await postgres.save_location({name: "dummy-loc"});
            expect(location_saved).toBeDefined();
            expect(location_saved).not.toBe(location1);

        } catch (err) {
            throw err;
        } finally {
            //postgres.connection_close();
        }
    })

    //test("should return an empty list after load from emtpy DB")
})