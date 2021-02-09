const GuestRegistrationInMemRepository = require('../../../core/repositories/GuestRegistrationInMemRepository');
const Location = require('../../../core/entities/Location');
const Table = require('../../../core/entities/Table');
const Assign = require('../../../core/entities/Assign')

const location_id = 4711;
let location = new Location(location_id, "location-dummy");
let table = new Table(5811, "table-dummy", location_id);
let repo = new GuestRegistrationInMemRepository();

repo.save_location(location);

beforeEach(() => {
    // fixture setup
    repo.clear_table();
    repo.clear_assign_g2t();
})

test('fixture repo should be defined', () => {
    expect(repo).toBeDefined()
})

test('fixture table should be defined', () => {
    expect(table).toBeDefined()
})

test('should return right size for empty repo', () => {
    expect(repo.size_table()).toBe(0)
})

test('should return right size for repo after saving one table', () => {
    repo.save_table(table);
    expect(repo.size_table()).toBe(1)
})

test('should load same table from repo that has recently been stored', () => {
    repo.save_table(table)
    let table_loaded = repo.load_table(table.id, table.location_id)
    expect(table.id).toBe(table_loaded.id)
    expect(table.name).toBe(table_loaded.name)
    expect(table.location_id).toBe(table_loaded.location_id)
})

test('should remove right table from repo', () => {
    repo.save_table(table);
    let table2 = new Table(4712, "table-dummy-2", location_id);
    repo.save_table(table2);
    expect(repo.size_table()).toBe(2);
    let table_removed = repo.remove_table(table2.id, table2.location_id);
    expect(table2.id).toBe(table_removed.id)
    expect(repo.size_table()).toBe(1);
})

test('should clear repository: remove all tables', () => {
    repo.save_table(new Table(5811, "table-dummy-1", location_id));
    repo.save_table(new Table(5812, "table-dummy-2", location_id));
    repo.save_table(new Table(5813, "table-dummy-3", location_id));
    expect(repo.size_table()).toBe(3);
    repo.clear_table()
    expect(repo.size_table()).toBe(0);
    repo.save_table(new Table(5813, "table-dummy-1", location_id));
    expect(repo.size_table()).toBe(1);
})

test('should return undefined if table is not found', () => {
    let table_loaded = repo.load_table(5811, 4711);
    expect(table_loaded).toBeNull();
})

test('should return undefined if no parameters are given', () => {
    try {
        let table_loaded = repo.load_table();
    } catch (e) {
        expect(e.message).toBe("Error in load_table: id is undefined!");
    }
})

test('should throw an error if save table and location_id of new table is not in repo', () => {
    let table_location_not_exists = new Table(5811, "table-dummy-1", 123456789);
    expect(() => {
        repo.save_table(table_location_not_exists);
    }).toThrowError(Error);
    expect(() => {
        repo.save_table(table_location_not_exists);
    }).toThrowError(/^Repo: Location.*does not exist!/);
})

test('should throw an error if try to save an existing table', () => {
    repo.save_table(table);
    expect(() => {
        repo.save_table(table);
    }).toThrowError(Error);
    expect(() => {
        repo.save_table(table);
    }).toThrowError(/^Repo: Table.*already exists!$/);
})

test('should return 1 as there is one assignment for the given time period', async () => {
    repo.save_table(table);
    const time_1 = Date.parse("2021-02-06T18:32:30.000+0200");
    const time_2 = Date.parse("2021-02-06T18:42:00.000+0200");
    const time_3 = Date.parse("2021-02-06T18:52:00.000+0200");
    save_assignments(table.id, time_1, time_2, time_3);
    let activity = repo.get_table_activity(location_id, table.id, "2021-02-06T18:32:00.000+0200", "2021-02-06T18:34:00.000+0200");
    expect(activity).toBe(1);
})

test('should return 0 as there is no assignment for the given time period', async () => {
    repo.save_table(table);
    const time_1 = Date.parse("2021-02-06T18:22:30.000+0200");
    const time_2 = Date.parse("2021-02-06T18:42:00.000+0200");
    const time_3 = Date.parse("2021-02-06T18:52:00.000+0200");
    save_assignments(table.id, time_1, time_2, time_3);
    let activity = repo.get_table_activity(location_id, table.id, "2021-02-06T18:32:00.000+0200", "2021-02-06T18:34:00.000+0200");
    expect(activity).toBe(0);
})

test('should return 2 as there are two assignments for the given time period', async () => {
    repo.save_table(table);
    const time_1 = Date.parse("2021-02-06T18:32:30.000+0200");
    const time_2 = Date.parse("2021-02-06T18:32:50.000+0200");
    const time_3 = Date.parse("2021-02-06T18:52:00.000+0200");
    save_assignments(table.id, time_1, time_2, time_3);
    let activity = repo.get_table_activity(location_id, table.id, "2021-02-06T18:32:00.000+0200", "2021-02-06T18:34:00.000+0200");
    expect(activity).toBe(2);
})

test('should throw an error as the location for an activity request does not exist', async () => {
    repo.save_table(table);
    const time_1 = Date.parse("2021-02-06T18:32:30.000+0200");
    const time_2 = Date.parse("2021-02-06T18:32:50.000+0200");
    const time_3 = Date.parse("2021-02-06T18:52:00.000+0200");
    save_assignments(table.id, time_1, time_2, time_3);
    try {
        let activity = repo.get_table_activity(123, table.id, "2021-02-06T18:32:00.000+0200", "2021-02-06T18:34:00.000+0200");
        fail("Exception not thrown");
    } catch (e) {
        expect(e.message).toBe("Location not found!");
    }
})

test('should throw an error as the table for an activity request does not exist', async () => {
    repo.save_table(table);
    const time_1 = Date.parse("2021-02-06T18:32:30.000+0200");
    const time_2 = Date.parse("2021-02-06T18:32:50.000+0200");
    const time_3 = Date.parse("2021-02-06T18:52:00.000+0200");
    save_assignments(table.id, time_1, time_2, time_3);
    try {
        let activity = repo.get_table_activity(location_id, 123, "2021-02-06T18:32:00.000+0200", "2021-02-06T18:34:00.000+0200");
        fail("Exception not thrown");
    } catch (e) {
        expect(e.message).toBe("Table not found!");
    }
})

function save_assignments(table_id, time_1, time_2, time_3) {
    let assign_1 = new Assign(location_id, table_id, time_1, "Sepp", "Forcher", "01 234567", "sepp@tv.at");
    let assign_2 = new Assign(location_id, table_id, time_2, "Richard", "Stallman", "02 234567", "robert@freedom.org");
    let assign_3 = new Assign(location_id, table_id, time_3, "Dr.", "Oetker", "03 234567", "dr.oetker@schoko.muffin");
    repo.save_assign_g2t(assign_1);
    repo.save_assign_g2t(assign_2);
    repo.save_assign_g2t(assign_3);
}