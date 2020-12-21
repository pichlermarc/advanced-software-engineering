const GuestRegistrationInMemRepository = require('../../../core/repositories/GuestRegistrationInMemRepository');
const Location = require('../../../core/entities/Location');
const Table = require('../../../core/entities/Table');

const location_id = 4711;
let location = new Location(location_id, "location-dummy");
let table = new Table(5811, "table-dummy", location_id);
let repo = new GuestRegistrationInMemRepository();

repo.save_location(location);

beforeEach(() => {
    // fixture setup
    repo.clear_table();
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
    let table_loaded = repo.load_table(table.id)
    expect(table.id).toBe(table_loaded.id)
    expect(table.name).toBe(table_loaded.name)
})

test('should remove right table from repo', () => {
    repo.save_table(table);
    let table2 = new Table(4712, "table-dummy-2", location_id);
    repo.save_table(table2);
    expect(repo.size_table()).toBe(2);
    let table_removed = repo.remove_table(table2.id);
    expect(table2.id).toBe(table_removed.id)
    expect(repo.size_table()).toBe(1);
})

test('should clear repository: remove all tables', () => {
    repo.save_table(new Table(5811, "table-dummy-1"), location_id);
    repo.save_table(new Table(5812, "table-dummy-2"), location_id);
    repo.save_table(new Table(5813, "table-dummy-3"), location_id);
    expect(repo.size_table()).toBe(3);
    repo.clear_table()
    expect(repo.size_table()).toBe(0);
    repo.save_table(new Table(5813, "table-dummy-1"), location_id);
    expect(repo.size_table()).toBe(1);
})

test('should return undefined if table is not found', () => {
    let table_loaded = repo.load_table(5811);
    expect(table_loaded).toBeUndefined();
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
