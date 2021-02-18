const GuestRegistrationPostgres = require("../../../core/repositories/GuestRegistrationPostgres")
const {eLocation} = require("../../../core/entities")


describe('Integration test - postgres/sequelize: basic location testing ', () => {

    let postgres;
    let location_1;
    let location_2;
    let location_3;

    beforeAll(() => {
        postgres = new GuestRegistrationPostgres();
    });

    beforeEach(async () => {
        try {
            // reset DB model of 'mLocation' (NOTE: includes empty table!)
            await postgres.db.models.mLocation.sync({force: true});
            location_1 = new eLocation(null, "dummy-loc-#1");
            location_2 = new eLocation(null, "dummy-loc-#2");
            location_3 = new eLocation(null, "dummy-loc-#3");
        } catch (err) {
            console.error('Sync-mLocation error:', err);
        }
    })

    afterAll( () => {
        postgres.connection_close();
    });

    test("should save location to postgres", async () => {
        try {
            const location_fetched = await postgres.save_location(location_1);
            expect(location_fetched).toBeDefined();
            expect(location_fetched.name).toBe(location_1.name);

        } catch (err) {
            console.error(err)
            throw err;
        }
    })

    test("should not save location to postgres as name is undefined", async () => {
        try {
            location_1.name = undefined;
            const location_fetched = await postgres.save_location(location_1);
            fail("Exception not thrown");

        } catch (err) {
            expect(err.name).toBe("SequelizeValidationError");
        }
    })

    test("should load location with", async () => {
        try {
            const location_saved = await postgres.save_location(location_1);
            const location_fetched = await postgres.load_location(location_saved.id);
            expect(location_fetched).toBeDefined();
            expect(location_fetched.name).toBe(location_saved.name);

        } catch (err) {
            console.error(err)
            throw err;
        }
    })

    test("should update field 'name' of location", async () => {
        try {
            const location_saved = await postgres.save_location(location_1);
            const name_update = "updated-location-name";
            const location_update = new eLocation(location_saved.id, name_update);

            const location_fetched = await postgres.update_location(location_update);
            expect(location_fetched).toBeDefined();
            expect(location_fetched.id).toBe(location_update.id)
            expect(location_fetched.name).toBe(location_update.name);

        } catch (err) {
            console.error(err)
            throw err;
        }
    })

    test("should not update location in postgres as name is null", async () => {
        try {
            const location_fetched = await postgres.save_location(location_1);
            location_fetched.name = null;
            await postgres.update_location(location_fetched);
            fail("Exception not thrown");

        } catch (err) {
            expect(err.name).toBe("SequelizeValidationError");
        }
    })

    test("should not update location in postgres as it is unknown", async () => {
        try {
            const location_fetched = await postgres.save_location(location_1);
            location_fetched.id = 123;
            let affected = await postgres.update_location(location_fetched);
            expect(affected).toBeUndefined();

        } catch (err) {
            console.error(err)
            throw err;
        }
    })

    test("should return undefined if updating a not existing location", async () => {
        try {
            await postgres.save_location(location_1);
            const id_update = 99999;
            const name_update = "updated-location-name";
            const location_update = new eLocation(id_update, name_update);

            const location_fetched = await postgres.update_location(location_update);
            expect(location_fetched).toBeUndefined();

        } catch (err) {
            console.error(err)
            throw err;
        }
    })

    test("should remove location", async () => {
        try {
            const location_saved = await postgres.save_location(location_1);

            const location_fetched = await postgres.remove_location(location_saved.id);
            expect(location_fetched).toBeDefined();
            expect(location_fetched.id).toBe(location_saved.id);

        } catch (err) {
            console.error(err)
            throw err;
        }
    })

    test("should return undefined if removing a not existing location", async () => {
        try {
            await postgres.save_location(location_1);
            const id_remove = 99999;

            const location_fetched = await postgres.remove_location(id_remove);
            expect(location_fetched).toBeUndefined();

        } catch (err) {
            console.error(err)
            throw err;
        }
    })

    test("should throw an error when deleting a location from not existent mLocation location", async () => {
        try {
            const location_saved = await postgres.save_location(location_1);
            postgres.db.models.mLocation.drop({force: true});
            await postgres.remove_location(location_saved.id);
            fail("Exception not thrown");

        } catch (err) {
            expect(err.name).toBe("SequelizeDatabaseError");
        }
    })

    test("should return all locations from DB", async () => {
        try {
            await postgres.save_location(location_1);
            await postgres.save_location(location_2);
            await postgres.save_location(location_3);

            const locations_fetched = await postgres.load_all_locations();
            expect(locations_fetched).toBeDefined();
            expect(locations_fetched.length).toBe(3);
            expect(locations_fetched[0].name).toBe(location_1.name);
            expect(locations_fetched[1].name).toBe(location_2.name);
            expect(locations_fetched[2].name).toBe(location_3.name);

        } catch (err) {
            console.error(err)
            throw err;
        }
    })

    test("should throw an error when reading from not existent mLocation table", async () => {
        try {
            await postgres.db.models.mLocation.drop({force: true});
            await postgres.load_all_locations();
            fail("Exception not thrown");
        } catch (err) {
            expect(err.name).toBe("SequelizeDatabaseError");
        }
    })

    test("should return an empty list after load from emtpy DB", async () => {
        try {
            const locations_fetched = await postgres.load_all_locations();
            expect(locations_fetched).toBeDefined();
            expect(locations_fetched.length).toBe([].length);
        } catch (err) {
            console.error(err)
            throw err;
        }
    })

    test("should return size zero after load from emtpy DB", async () => {
        try {
            const locations_size = await postgres.size_location();
            expect(locations_size).toBe(0);
        } catch (err) {
            console.error(err)
            throw err;
        }
    })

    test("should return size 3 after inserting 3 times DB", async () => {
        try {
            await postgres.save_location(location_1);
            await postgres.save_location(location_2);
            await postgres.save_location(location_3);

            const locations_size = await postgres.size_location();
            expect(locations_size).toBe(3);

        } catch (err) {
            console.error(err)
            throw err;
        }
    })

    test("should throw an error when reading the size from not existent mLocation table", async () => {
        try {
            await postgres.db.models.mLocation.drop({force: true});
            await postgres.size_location();
            fail("Exception not thrown");
        } catch (err) {
            expect(err.name).toBe("SequelizeDatabaseError");
        }
    })
})
