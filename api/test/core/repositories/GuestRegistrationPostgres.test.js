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
        postgres.connection_close();
        postgres.close();
    });

    test("should save location to postgres", async () => {

        try {
            const location_fetched = await postgres.save_location(location1);
            expect(location_fetched).toBeDefined();
            expect(location_fetched.name).toBe(location1.name);

        } catch (err) {
            throw err;
        } finally {
            //postgres.connection_close();
        }
    })

    test("should load location with id = 1", async () => {
        try {
            const location_fetched = await postgres.load_location(1);
            expect(location_fetched).toBeDefined();
            expect(location_fetched.name).toBe(location1.name);

        } catch (err) {
            throw err;
        } finally {
            //postgres.connection_close();
        }
    })

    test("should update field 'name' of location with id = 1", async () => {
        try {
            const name_update = "updated-location-name";
            const location_update = new eLocation(1, name_update);
            const location_fetched = await postgres.update_location(location_update);
            expect(location_fetched).toBeDefined();
            expect(location_fetched.name).toBe(name_update);

        } catch (err) {
            throw err;
        }
    })

    test("should return undefined if update an not existing location with id = 999999", async () => {
        try {
            const name_update = "updated-location-name";
            const location_update = new eLocation(999999, name_update);
            const location_fetched = await postgres.update_location(location_update);
            expect(location_fetched).toBeUndefined();

        } catch (err) {
            throw err;
        }
    })

    test("should remove location with id = 1", async () => {
        try {
            const location_fetched = await postgres.remove_location(1);
            expect(location_fetched).toBeDefined();
            expect(location_fetched.id).toBe(1);

        } catch (err) {
            throw err;
        }
    })

    test("should return undefined if remove location with id = 999999", async () => {
        try {
            const location_fetched = await postgres.remove_location(999999);
            expect(location_fetched).toBeUndefined();

        } catch (err) {
            throw err;
        }
    })

    //test("should return an empty list after load from emtpy DB")
})
