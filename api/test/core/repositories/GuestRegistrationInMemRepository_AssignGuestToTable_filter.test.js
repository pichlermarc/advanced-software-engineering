const GuestRegistrationInMemRepository = require('../../../core/repositories/GuestRegistrationInMemRepository');
const Location = require('../../../core/entities/Location');
const Table = require('../../../core/entities/Table');
const Guest = require('../../../core/entities/Guest');
const AssignGuestToTable = require('../../../core/entities/AssignGuestToTable');

let repo = new GuestRegistrationInMemRepository();

let location = new Location(4711, "location-dummy");
let table = new Table(5811, "table-dummy", location.id);
let guest1 = new Guest(6911, "guest-dummy", "guest.dummy-1@x.y", "01-234-567891");
let guest2 = new Guest(6912, "guest-dummy", "guest.dummy-2@x.y", "01-234-567892");
let guest3 = new Guest(6913, "guest-dummy", "guest.dummy-3@x.y", "01-234-567893");

let date_from = 1;
let date_to = 2;
let assign1 = new AssignGuestToTable(location.id, table.id, guest1.id, date_from, date_to);
let assign2 = new AssignGuestToTable(location.id, table.id, guest2.id, date_from, date_to);
let assign3 = new AssignGuestToTable(location.id, table.id, guest3.id, date_from, date_to);

repo.save_location(location);
repo.save_table(table);
repo.save_guest(guest1);
repo.save_guest(guest2);
repo.save_guest(guest3);

beforeEach(() => {
    repo.repo.clear_assign_g2t();
    repo.save_assign_g2t(assign1);
    repo.save_assign_g2t(assign2);
    repo.save_assign_g2t(assign3);
})

test('should return list of assignments if passing only location and table to load_assign_g2t', () => {
    let load_all_guest_on_table = repo.load_assign_g2t(location.id, table.id);
    expect(load_all_guest_on_table).toBeDefined();
    expect(load_all_guest_on_table.length).toBe(3);
})
