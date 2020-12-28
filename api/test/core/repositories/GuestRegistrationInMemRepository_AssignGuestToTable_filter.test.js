const GuestRegistrationInMemRepository = require('../../../core/repositories/GuestRegistrationInMemRepository');
const Location = require('../../../core/entities/Location');
const Table = require('../../../core/entities/Table');
const Guest = require('../../../core/entities/Guest');
const AssignGuestToTable = require('../../../core/entities/AssignGuestToTable');

let repo = new GuestRegistrationInMemRepository();

let location1 = new Location(4711, "location1-dummy");
let location2 = new Location(4712, "location2-dummy");
let table1 = new Table(5811, "table1-dummy", location1.id);
let table2 = new Table(5812, "table2-dummy", location1.id);
let table3 = new Table(5813, "table3-dummy", location1.id);
let table4 = new Table(5814, "table4-dummy", location2.id);
let table5 = new Table(5815, "table5-dummy", location2.id);
let guest1 = new Guest(6911, "guest1-dummy", "guest.dummy-1@x.y", "01-234-567891");
let guest2 = new Guest(6912, "guest2-dummy", "guest.dummy-2@x.y", "01-234-567892");
let guest3 = new Guest(6913, "guest3-dummy", "guest.dummy-3@x.y", "01-234-567893");
let guest4 = new Guest(6914, "guest4-dummy", "guest.dummy-4@x.y", "01-234-567894");
let guest5 = new Guest(6915, "guest5-dummy", "guest.dummy-5@x.y", "01-234-567895");

let date_from1 = 1;
let date_to1 = 2;
let assign1 = new AssignGuestToTable(location1.id, table1.id, guest1.id, date_from1, date_to1);
let assign2 = new AssignGuestToTable(location1.id, table1.id, guest2.id, date_from1, date_to1);
let assign3 = new AssignGuestToTable(location1.id, table1.id, guest3.id, date_from1, date_to1);

let assign4 = new AssignGuestToTable(location2.id, table5.id, guest4.id, date_from1, date_to1);
let assign5 = new AssignGuestToTable(location2.id, table5.id, guest5.id, date_from1, date_to1);


repo.save_location(location1);
repo.save_table(table1);
repo.save_table(table2);
repo.save_table(table3);

repo.save_guest(guest1);
repo.save_guest(guest2);
repo.save_guest(guest3);

repo.save_location(location2);
repo.save_table(table4);
repo.save_table(table5);

repo.save_guest(guest4);
repo.save_guest(guest5);


beforeEach(() => {
    repo.clear_assign_g2t();
    repo.save_assign_g2t(assign1);
    repo.save_assign_g2t(assign2);
    repo.save_assign_g2t(assign3);
    repo.save_assign_g2t(assign4);
    repo.save_assign_g2t(assign5);

})

test('should setup the repo of assignments as well', () => {
    expect(repo).toBeDefined();
    expect(repo.size_location()).toBe(2);
    expect(repo.size_table()).toBe(5);
    expect(repo.size_guest()).toBe(5);
    expect(repo.size_assign_g2t()).toBe(5);
})

test('should return all 5 assignments if passing all parameter as undefined', () => {
    let all_guest_on_table = repo.filter_assign_g2t(undefined, undefined, undefined,
        undefined, undefined);
    expect(all_guest_on_table).toBeDefined();
    expect(all_guest_on_table.length).toBe(5);
})

test('should return all 5 assignments if passing no parameter', () => {
    let all_guest_on_table = repo.filter_assign_g2t();
    expect(all_guest_on_table).toBeDefined();
    expect(all_guest_on_table.length).toBe(5);
})

test('should return list of assignments if passing only location and table', () => {
    let all_guest_on_table = repo.filter_assign_g2t(location1.id, table1.id);
    expect(all_guest_on_table).toBeDefined();
    expect(all_guest_on_table.length).toBe(3);
    expect(all_guest_on_table[0]).toBe(assign1);
    expect(all_guest_on_table[1]).toBe(assign2);
    expect(all_guest_on_table[2]).toBe(assign3);
})

test('should return empty list of assignments if passing location1 and wrong table2', () => {
    let all_guest_on_table = repo.filter_assign_g2t(location1.id, table2.id);
    expect(all_guest_on_table).toBeDefined();
    expect(all_guest_on_table.length).toBe(0);
})

test('should return empty list of assignments if passing location2 and wrong table4', () => {
    let all_guest_on_table = repo.filter_assign_g2t(location2.id, table4.id);
    expect(all_guest_on_table).toBeDefined();
    expect(all_guest_on_table.length).toBe(0);
})

test('should return list of assignments if passing only location1', () => {
    let all_guest_on_table = repo.filter_assign_g2t(location1.id);
    expect(all_guest_on_table).toBeDefined();
    expect(all_guest_on_table.length).toBe(3);
    expect(all_guest_on_table[0]).toBe(assign1);
    expect(all_guest_on_table[1]).toBe(assign2);
    expect(all_guest_on_table[2]).toBe(assign3);
})

test('should return list of assignments if passing only location2', () => {
    let all_guest_on_table = repo.filter_assign_g2t(location2.id);
    expect(all_guest_on_table).toBeDefined();
    expect(all_guest_on_table.length).toBe(2);
    expect(all_guest_on_table[0]).toBe(assign4);
    expect(all_guest_on_table[1]).toBe(assign5);
})

test('should return all 5 assignments if passing only date_from1 and date_to1', () => {
    let all_guest_on_table = repo.filter_assign_g2t(undefined, undefined, undefined,
        date_from1, date_to1);
    expect(all_guest_on_table).toBeDefined();
    expect(all_guest_on_table.length).toBe(5);
})
