const GuestRegistrationPostgres = require("../../../core/repositories/GuestRegistrationPostgres")
const {eLocation, eTable, eAssign} = require("../../../core/entities")


describe('Integration test - postgres/sequelize: basic table testing ', () => {

    let postgres;
    let location_1;
    let table_1;
    let table_2;
    let table_3;

    beforeAll(async () => {
        postgres = new GuestRegistrationPostgres();
    });

    beforeEach(async () => {
        try {
            // reset DB models
            await postgres.db.models.mLocation.sync({force: true});
            await postgres.db.models.mTable.sync({force: true});
            await postgres.db.models.mAssign.sync({force: true});

            location_1 = await postgres.save_location(new eLocation(null, "dummy-loc"));
            table_1 = new eTable(null, "dummy-table-#1", location_1.id, -2.5, 3.66);
            table_2 = new eTable(null, "dummy-table-#2", location_1.id, -2.5, 3.66);
            table_3 = new eTable(null, "dummy-table-#3", location_1.id, -2.5, 3.66);
        } catch (err) {
            console.error('Sync error:', err);
        }
    })

    afterAll( () => {
        postgres.connection_close();
    });

    test("should save table to postgres", async () => {
        try {
            const table_fetched = await postgres.save_table(table_1);
            expect(table_fetched).toBeDefined();
            expect(table_fetched.name).toBe(table_1.name);
            expect(table_fetched.location_id).toBe(table_1.location_id);

        } catch (err) {
            console.error(err)
            throw err;
        }
    })

    test("should not save table to postgres as location is invalid", async () => {
        try {
            table_1.location_id = 123;
            const table_fetched = await postgres.save_table(table_1);
            fail("Exception not thrown");

        } catch (err) {
            expect(err.name).toBe("SequelizeForeignKeyConstraintError");
        }
    })

    test("should load table", async () => {
        try {
            const table_saved = await postgres.save_table(table_1);
            const table_fetched = await postgres.load_table(table_saved.id, table_saved.location_id);
            expect(table_fetched).toBeDefined();
            expect(table_fetched.name).toBe(table_saved.name);
            expect(table_fetched.location_id).toBe(table_1.location_id);

        } catch (err) {
            console.error(err)
            throw err;
        }
    })

    test("should update field 'name' of table", async () => {
        try {
            const table_saved = await postgres.save_table(table_1);
            const name_update = "updated-table-name";
            const table_update = new eTable(table_saved.id, name_update, table_saved.location_id, -2.5, 3.66);

            const table_fetched = await postgres.update_table(table_update);
            expect(table_fetched).toBeDefined();
            expect(table_fetched.id).toBe(table_update.id)
            expect(table_fetched.name).toBe(table_update.name);
            expect(table_fetched.location_id).toBe(table_1.location_id);

        } catch (err) {
            console.error(err)
            throw err;
        }
    })

    test("should return undefined if update a not existing table", async () => {
        try {
            const table_saved = await postgres.save_table(table_1);
            const id_update = 99999;
            const name_update = "updated-table-name";
            const table_update = new eTable(id_update, name_update, table_saved.location_id, -2.5, 3.66);

            const table_fetched = await postgres.update_table(table_update);
            expect(table_fetched).toBeUndefined();

        } catch (err) {
            console.error(err)
            throw err;
        }
    })

    test("should not update table in postgres as name is null", async () => {
        try {
            const table_saved = await postgres.save_table(table_1);
            table_saved.name = null;
            await postgres.update_table(table_saved);
            fail("Exception not thrown");

        } catch (err) {
            expect(err.name).toBe("SequelizeValidationError");
        }
    })

    test("should remove table with id = 1", async () => {
        try {
            const table_saved = await postgres.save_table(table_1);

            const table_fetched = await postgres.remove_table(table_saved.id, table_saved.location_id);
            expect(table_fetched).toBeDefined();
            expect(table_fetched.id).toBe(table_saved.id);
            expect(table_fetched.location_id).toBe(table_saved.location_id);

        } catch (err) {
            console.error(err)
            throw err;
        }
    })

    test("should return undefined if remove a not existing table", async () => {
        try {
            const table_saved = await postgres.save_table(table_1);
            const id_remove = 99999;

            const table_fetched = await postgres.remove_table(id_remove, table_saved.location_id);
            expect(table_fetched).toBeUndefined();

        } catch (err) {
            console.error(err)
            throw err;
        }
    })

    test("should throw an error when deleting a table with location id null", async () => {
        try {
            const table_saved = await postgres.save_table(table_1);
            await postgres.remove_table(table_saved.id, undefined);
            fail("Exception not thrown");

        } catch (err) {
            expect(err.name).toBe("Error");
        }
    })

    test("should return all tables from DB", async () => {
        try {
            await postgres.save_table(table_1);
            await postgres.save_table(table_2);
            await postgres.save_table(table_3);

            const tables_fetched = await postgres.load_all_tables();
            expect(tables_fetched).toBeDefined();
            expect(tables_fetched.length).toBe(3);
            expect(tables_fetched[0].name).toBe(table_1.name);
            expect(tables_fetched[0].location_id).toBe(table_1.location_id);
            expect(tables_fetched[1].name).toBe(table_2.name);
            expect(tables_fetched[1].location_id).toBe(table_2.location_id);
            expect(tables_fetched[2].name).toBe(table_3.name);
            expect(tables_fetched[2].location_id).toBe(table_3.location_id);

        } catch (err) {
            console.error(err)
            throw err;
        }
    })

    test("should return an empty list after load from emtpy DB", async () => {
        try {
            const tables_fetched = await postgres.load_all_tables();
            expect(tables_fetched).toBeDefined();
            expect(tables_fetched.length).toBe([].length);
        } catch (err) {
            console.error(err)
            throw err;
        }
    })

    test("should throw an error when reading from not existent mTable table", async () => {
        try {
            await postgres.db.models.mTable.drop({force: true});
            await postgres.load_all_tables();
            fail("Exception not thrown");
        } catch (err) {
            expect(err.name).toBe("SequelizeDatabaseError");
        }
    })

    test("should return size zero after load from emtpy DB", async () => {
        try {
            const tables_size = await postgres.size_table();
            expect(tables_size).toBe(0);
        } catch (err) {
            console.error(err)
            throw err;
        }
    })

    test("should return size 3 after inserting 3 times DB", async () => {
        try {
            await postgres.save_table(table_1);
            await postgres.save_table(table_2);
            await postgres.save_table(table_3);

            const tables_size = await postgres.size_table();
            expect(tables_size).toBe(3);

        } catch (err) {
            console.error(err)
            throw err;
        }
    })

    test("should throw an error when reading the size from not existent mTable table", async () => {
        try {
            await postgres.db.models.mTable.drop({force: true});
            await postgres.size_table();
            fail("Exception not thrown");
        } catch (err) {
            expect(err.name).toBe("SequelizeDatabaseError");
        }
    })

    test('should return 1 as there is one assignment for the given time period', async () => {
        const table_saved = await postgres.save_table(table_1);
        const time_1 = Date.parse("2021-02-06T18:32:30.000+0200");
        const time_2 = Date.parse("2021-02-06T18:42:00.000+0200");
        const time_3 = Date.parse("2021-02-06T18:52:00.000+0200");
        await save_assignments(table_saved.id, time_1, time_2, time_3);
        let activity = await postgres.get_table_activity(location_1.id, table_saved.id, "2021-02-06T18:32:00.000+0200", "2021-02-06T18:34:00.000+0200");
        expect(activity).toBe(1);
    })

    test('should return 0 as there is no assignment for the given time period', async () => {
        const table_saved = await postgres.save_table(table_1);
        const time_1 = Date.parse("2021-02-06T18:22:30.000+0200");
        const time_2 = Date.parse("2021-02-06T18:42:00.000+0200");
        const time_3 = Date.parse("2021-02-06T18:52:00.000+0200");
        await save_assignments(table_saved.id, time_1, time_2, time_3);
        let activity = await postgres.get_table_activity(location_1.id, table_saved.id, "2021-02-06T18:32:00.000+0200", "2021-02-06T18:34:00.000+0200");
        expect(activity).toBe(0);
    })

    test('should return 2 as there are two assignments for the given time period', async () => {
        const table_saved = await postgres.save_table(table_1);
        const time_1 = Date.parse("2021-02-06T18:32:30.000+0200");
        const time_2 = Date.parse("2021-02-06T18:32:50.000+0200");
        const time_3 = Date.parse("2021-02-06T18:52:00.000+0200");
        await save_assignments(table_saved.id, time_1, time_2, time_3);
        let activity = await postgres.get_table_activity(location_1.id, table_saved.id, "2021-02-06T18:32:00.000+0200", "2021-02-06T18:34:00.000+0200");
        expect(activity).toBe(2);
    })

    test('should throw an error as the location for an activity request does not exist', async () => {
        const table_saved = await postgres.save_table(table_1);
        const time_1 = Date.parse("2021-02-06T18:32:30.000+0200");
        const time_2 = Date.parse("2021-02-06T18:32:50.000+0200");
        const time_3 = Date.parse("2021-02-06T18:52:00.000+0200");
        await save_assignments(table_saved.id, time_1, time_2, time_3);
        try {
            let activity = await postgres.get_table_activity(123, table_saved.id, "2021-02-06T18:32:00.000+0200", "2021-02-06T18:34:00.000+0200");
            fail("Exception not thrown");
        } catch (e) {
            expect(e.message).toBe("Location not found");
        }
    })

    test('should throw an error as the table for an activity request does not exist', async () => {
        const table_saved = await postgres.save_table(table_1);
        const time_1 = Date.parse("2021-02-06T18:32:30.000+0200");
        const time_2 = Date.parse("2021-02-06T18:32:50.000+0200");
        const time_3 = Date.parse("2021-02-06T18:52:00.000+0200");
        await save_assignments(table_saved.id, time_1, time_2, time_3);
        try {
            let activity = await postgres.get_table_activity(location_1.id, 123, "2021-02-06T18:32:00.000+0200", "2021-02-06T18:34:00.000+0200");
            fail("Exception not thrown");
        } catch (e) {
            expect(e.message).toBe("Table not found");
        }
    })

    test('should throw an error as the date for an activity request is undefined', async () => {
        const table_saved = await postgres.save_table(table_1);
        try {
            let activity = await postgres.get_table_activity(location_1.id, table_saved.id, undefined, "2021-02-06T18:34:00.000+0200");
            fail("Exception not thrown");
        } catch (e) {
            expect(e.name).toBe("SequelizeDatabaseError");
        }
    })

    async function save_assignments(table_id, time_1, time_2, time_3) {
        let assign_1 = new eAssign(location_1.id, table_id, time_1, "Sepp", "Forcher", "01 234567", "sepp@tv.at");
        let assign_2 = new eAssign(location_1.id, table_id, time_2, "Richard", "Stallman", "02 234567", "robert@freedom.org");
        let assign_3 = new eAssign(location_1.id, table_id, time_3, "Dr.", "Oetker", "03 234567", "dr.oetker@schoko.muffin");
        await postgres.save_assign(assign_1);
        await postgres.save_assign(assign_2);
        await postgres.save_assign(assign_3);
    }
})