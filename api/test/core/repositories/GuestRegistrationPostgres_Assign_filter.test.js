const GuestRegistrationPostgres = require("../../../core/repositories/GuestRegistrationPostgres")
const {eLocation, eTable, eAssign} = require("../../../core/entities")
const {sequelize, gte} = require("../../../core/repositories")


describe('Integration test - postgres/sequelize: filter assign testing ', () => {

    let postgres;
    let location_1;
    let location_2;
    let table_1;
    let table_2;
    let table_3;
    let table_4;
    let table_5;

    const hour_in_seconds = 1 * 60 * 60;
    const time_1 = new Date().getTime();
    const time_2 = new Date().getTime() - hour_in_seconds;
    const time_3 = new Date().getTime() - 2 * hour_in_seconds;
    const time_4 = new Date().getTime() - 1/2 * hour_in_seconds;
    const time_5 = new Date().getTime() - 3 * hour_in_seconds;
    let assign_1;
    let assign_2;
    let assign_3;
    let assign_4;
    let assign_5;
    let assign_6;
    let assign_7;
    let assign_8;
    let assign_9;
    let assign_list = [
        assign_1, assign_2, assign_3, assign_4, assign_5,
        assign_6, assign_7, assign_8, assign_9
    ]

    beforeAll(async () => {
        postgres = new GuestRegistrationPostgres();

        try {
            // reset DB models
            await postgres.db.models.mLocation.sync({force: true});
            await postgres.db.models.mTable.sync({force: true});
            await postgres.db.models.mAssign.sync({force: true});

            location_1 = await postgres.save_location(new eLocation(null, "Seekaffee"));
            location_2 = await postgres.save_location(new eLocation(null, "Hafenstadt"));

            table_1 = await postgres.save_table(new eTable(null, "vip", location_1.id));
            table_2 = await postgres.save_table(new eTable(null, "black", location_1.id));
            table_3 = await postgres.save_table(new eTable(null, "vip", location_1.id));
            table_4 = await postgres.save_table(new eTable(null, "vip", location_1.id));
            table_5 = await postgres.save_table(new eTable(null, "vip", location_1.id));

            assign_1 = await postgres.save_assign(new eAssign(location_1.id, table_1.id, time_1, "Sepp", "Forcher", "01 234567", "sepp@tv.at"));
            assign_2 = await postgres.save_assign(new eAssign(location_1.id, table_1.id, time_2, "Richard", "Stallman", "02 234567", "robert@freedom.org"));
            assign_3 = await postgres.save_assign(new eAssign(location_1.id, table_1.id, time_3, "Dr.", "Oetker", "03 234567", "dr.oetker@schoko.muffin"));
            assign_4 = await postgres.save_assign(new eAssign(location_1.id, table_2.id, time_4, "Arabella", "Kiesbauer", "04 234567", "arabella@kiesi.at"));
            assign_5 = await postgres.save_assign(new eAssign(location_1.id, table_3.id, time_5, "Martin", "Puntigam", "05 234567", "martin@sience-busters.at"));
            assign_6 = await postgres.save_assign(new eAssign(location_1.id, table_3.id, time_1, "Robert", "Martin", "06 234567", "oncle-bob@clean.code"));
            assign_7 = await postgres.save_assign(new eAssign(location_2.id, table_4.id, time_2, "Cpt.", "Picard", "07 234567", "Cpt.Picard@energy.com"));
            assign_8 = await postgres.save_assign(new eAssign(location_2.id, table_4.id, time_3, "Richard", "Lugner", "08 234567", "richard.lugner@loewe.sex"));
            assign_9 = await postgres.save_assign(new eAssign(location_2.id, table_5.id, time_4, "Christine", "Aschbacher", "09 234567", "c.aschi@meine.idee"));

        } catch (err) {
            console.error(err)
            throw err;
        }
    });

    afterAll( () => {
        postgres.connection_close();
    });

    test("should return whole assigns-table content if pass empty object for where-clause", async () => {
        try {
            const wc = {};
            const a_filter = await postgres.filter_assign(wc);
            expect(a_filter.length).toBeGreaterThanOrEqual(assign_list.length);

        } catch (err) {
            console.error(err)
            throw err;
        }
    })

    test("should return zero entries because of impossible where-clause", async () => {
        try {
            const wc = {
                location_id: 999_999,
                table_id: 888_888,
                date_from: time_1 + 100 * hour_in_seconds,
                first_name: "xxx",
                last_name: "yyy",
                phone: "555-333111",
                email: "xxx.yyy@zzz"
            };
            const a_filter = await postgres.filter_assign(wc);
            expect(a_filter.length).toBe(0);

        } catch (err) {
            console.error(err)
            throw err;
        }
    })

    test("should return 6 assignments, only at location_1", async () => {
        try {
            const wc = {
                location_id: location_1.id,
            };
            const a_filter = await postgres.filter_assign(wc);
            expect(a_filter.length).toBe(6);

        } catch (err) {
            console.error(err)
            throw err;
        }
    })

    test("should return 3 assignments, only at location_1 and table_1", async () => {
        try {
            const wc = {
                location_id: location_1.id,
                table_id: table_1.id,
            };
            const a_filter = await postgres.filter_assign(wc);
            expect(a_filter.length).toBe(3);

        } catch (err) {
            console.error(err)
            throw err;
        }
    })

    test("should return 3 assignments, only at location_1 and table_1 and from time_1 on", async () => {
        try {
            const wc = {
                location_id: location_1.id,
                table_id: table_1.id,
                // todo: check for >
                //date_from: {[gte]: time_1}
            };
            const a_filter = await postgres.filter_assign(wc);
            expect(a_filter.length).toBe(3);

        } catch (err) {
            console.error(err)
            throw err;
        }
    })

    test("should throw an error when filtering an assign with null as where_clause", async () => {
        try {
            await postgres.filter_assign(null);
            fail("Exception not thrown");
        } catch (err) {
            expect(err.name).toBe("TypeError");
        }
    })
})
