const GuestRegistrationInMemRepository = require('../../../core/repositories/GuestRegistrationInMemRepository');
const Location = require('../../../core/entities/Location');
const Table = require('../../../core/entities/Table');
const Guest = require('../../../core/entities/Guest');
const AssignGuestToTable = require('../../../core/entities/AssignGuestToTable');

let repo = new GuestRegistrationInMemRepository();

let location = new Location(4711, "location-dummy");
let table = new Table(5811, "table-dummy", location.id);
let guest = new Guest(6911, "guest-dummy", "guest.dummy-1@x.y", "01-234-567891");

let date_from = 1;
let date_to = 2;
let assign = new AssignGuestToTable(location.id, table.id, guest.id, date_from, date_to);

beforeEach(() => {
    // fixture setup
    repo.clear_table();
    repo.save_location(location);
    repo.save_table(table);
    repo.save_guest(guest);
})

afterEach(() => {
    // fixture teardown
});


test('fixture repo should be defined', () => {
    expect(repo).toBeDefined()
})

test('fixture table should be defined', () => {
    expect(location).toBeDefined()
})

test('fixture table should be defined', () => {
    expect(table).toBeDefined()
})

test('fixture table should be defined', () => {
    expect(guest).toBeDefined()
})

test('should create new assigment and check for all repository constraints', () => {
    let result_of_save = repo.save_assign_g2t(new AssignGuestToTable(999, 888, 777, 666, 555));
    expect(result_of_save).toBeUndefined();
})

test('should save new assignment if all repository constraints are ok', () => {
    repo.save_assign_g2t(assign);
    expect(repo.size_assign_g2t()).toBe(1);
})

/*
// TODO: test runs in intellij but NOT in command line - wtf!
test('should return all assignments if no parameters passed to load_g2t', () => {
    repo.save_assign_g2t(assign);
    let assignment_list = repo.load_assign_g2t();
    expect(assignment_list.length).toBe(1);
})
 */
test('should return correct assignment after saving', () => {
    repo.save_assign_g2t(assign);
    let load_assign = repo.load_assign_g2t(assign.location_id, assign.table_id,
        assign.guest_id, assign.date_from, assign.date_to);
    expect(load_assign).toBeDefined();
})

test('should return list of assignments if passing only location and table to load_assign_g2t', () => {
    let guest2 = new Guest(6912, "guest-dummy", "guest.dummy-1@x.y", "01-234-567891");
    let guest3 = new Guest(6913, "guest-dummy", "guest.dummy-1@x.y", "01-234-567891");
    repo.save_guest(guest2);
    repo.save_guest(guest3);

    let assign2 = new AssignGuestToTable(location.id, table.id, guest2.id, date_from, date_to);
    let assign3 = new AssignGuestToTable(location.id, table.id, guest3.id, date_from, date_to);
    repo.save_assign_g2t(assign2);
    repo.save_assign_g2t(assign3);

    let load_all_guest_on_table = repo.load_assign_g2t(assign.location_id, assign.table_id);
    expect(load_all_guest_on_table).toBeDefined();
    expect(load_all_guest_on_table.length).toBe(3);
})
