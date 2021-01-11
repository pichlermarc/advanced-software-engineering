//const create_config = require("../../../core/config")
//const create_db_connection = require("../../../core/repositories")
const GuestRegistrationPostgres = require("../../../core/repositories/GuestRegistrationPostgres")
const {eLocation, eTable, eAssign} = require("../../../core/entities")

//const cnf = create_config("development")

// todo: set env var or use 'development' config

describe('Integration test - postgres/sequelize: basic assign testing ', () => {

    let postgres;
    let location_1;
    let table_1;

    const hour_in_seconds = 1 * 60 * 60;
    const time_1 = new Date().getTime();
    const time_2 = new Date().getTime() - hour_in_seconds;
    const time_3 = new Date().getTime() - 2 * hour_in_seconds;
    let assign_1;
    let assign_2;
    let assign_3;

    beforeAll(async () => {
        postgres = new GuestRegistrationPostgres();

        try {
            location_1 = await postgres.save_location(new eLocation(null, "dummy-loc"));
            table_1 = await postgres.save_table(new eTable(null, "dummy-table-#1", location_1.id));
            assign_1 = new eAssign(location_1.id, table_1.id, time_1, "Sepp", "Forcher", "01 234567", "sepp@tv.at");
            assign_2 = new eAssign(location_1.id, table_1.id, time_2, "Richard", "Stallman", "02 234567", "robert@freedom.org");
            assign_3 = new eAssign(location_1.id, table_1.id, time_3, "Dr.", "Oetker", "03 234567", "dr.oetker@schoko.muffin");

        } catch (err) {
            console.error(err)
            throw err;
        }
    });

    beforeEach(async () => {
        try {
            // reset DB model of 'mAssign' (NOTE: includes empty assign!).
            await postgres.db.models.mAssign.sync({force: true});
        } catch (err) {
            console.error('Sync-mAssign error:', err);
        }
    })

    afterAll( () => {
        postgres.connection_close();
    });

    test("should save assign to postgres", async () => {
        try {
            const assign_fetched = await postgres.save_assign(assign_1);
            expect(assign_fetched).toBeDefined();
            expect(assign_fetched).toStrictEqual(assign_1)

        } catch (err) {
            console.error(err)
            throw err;
        }
    })

    test("should load assign from postgres", async () => {
        try {
            const assign_saved = await postgres.save_assign(assign_1);
            const assign_fetched = await postgres.load_assign(assign_1);
            expect(assign_fetched).toStrictEqual(assign_1);

        } catch (err) {
            console.error(err)
            throw err;
        }
    })

    test("should return all assigns from DB", async () => {
        try {
            await postgres.save_assign(assign_1);
            await postgres.save_assign(assign_2);
            await postgres.save_assign(assign_3);

            const assigns_fetched = await postgres.load_all_assigns();
            expect(assigns_fetched).toBeDefined();
            expect(assigns_fetched.length).toBe(3);
            expect(assigns_fetched).toStrictEqual([assign_1, assign_2, assign_3]);

        } catch (err) {
            console.error(err)
            throw err;
        }
    })

    test("should return an empty list after load from emtpy DB", async () => {
        try {
            const assigns_fetched = await postgres.load_all_assigns();
            expect(assigns_fetched).toBeDefined();
            expect(assigns_fetched.length).toBe([].length);
        } catch (err) {
            console.error(err)
            throw err;
        }
    })

    test("should return size zero after load from emtpy DB", async () => {
        try {
            const assigns_size = await postgres.size_assign();
            expect(assigns_size).toBe(0);
        } catch (err) {
            console.error(err)
            throw err;
        }
    })

    test("should return size 3 after inserting 3 times DB", async () => {
        try {
            await postgres.save_assign(assign_1);
            await postgres.save_assign(assign_2);
            await postgres.save_assign(assign_3);

            const assigns_size = await postgres.size_assign();
            expect(assigns_size).toBe(3);

        } catch (err) {
            console.error(err)
            throw err;
        }
    })
})
