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
