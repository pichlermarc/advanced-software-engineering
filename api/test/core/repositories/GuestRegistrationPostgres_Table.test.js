/**
 * Integrationtests
 * @group integrationtest
 */

const GuestRegistrationPostgres = require("../../../core/repositories/GuestRegistrationPostgres")
const {eLocation, eTable} = require("../../../core/entities")
const create_config = require("../../../core/config")


describe('Integration test - postgres/sequelize: basic table testing ', () => {

    let postgres;
    let location_1;
    let table_1;
    let table_2;
    let table_3;

    beforeAll(async () => {
        const cnf =  create_config("test");
        postgres = new GuestRegistrationPostgres(cnf, false);
        let c = postgres.init();

        try {
            location_1 = await postgres.save_location(new eLocation(null, "dummy-loc"));
            table_1 = new eTable(null, "dummy-table-#1", location_1.id);
            table_2 = new eTable(null, "dummy-table-#2", location_1.id);
            table_3 = new eTable(null, "dummy-table-#3", location_1.id);
        } catch (err) {
            console.error(err)
            throw err;
        }
        return c;

    });

    beforeEach(async () => {
        try {
            // reset DB model of 'mTable' (NOTE: includes empty table!).
            await postgres.db.mTable.sync({force: true});
        } catch (err) {
            console.error('Sync-mTable error:', err);
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
            const table_update = new eTable(table_saved.id, name_update, table_saved.location_id);

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
            const table_update = new eTable(id_update, name_update, table_saved.location_id);

            const table_fetched = await postgres.update_table(table_update);
            expect(table_fetched).toBeUndefined();

        } catch (err) {
            console.error(err)
            throw err;
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
})
