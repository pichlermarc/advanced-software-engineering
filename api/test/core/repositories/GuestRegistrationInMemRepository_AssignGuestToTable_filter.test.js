const GuestRegistrationInMemRepository = require('../../../core/repositories/GuestRegistrationInMemRepository');
const {eLocation, eTable, eAssign} = require('../../../core/entities');

const repo = new GuestRegistrationInMemRepository();

const location1 = new eLocation(4711, "location1-dummy");
const location2 = new eLocation(4712, "location2-dummy");
const table1 = new eTable(5811, "table1-dummy", location1.id);
const table2 = new eTable(5812, "table2-dummy", location1.id);
const table3 = new eTable(5813, "table3-dummy", location1.id);
const table4 = new eTable(5814, "table4-dummy", location2.id);
const table5 = new eTable(5815, "table5-dummy", location2.id);
const guest1 = ["6911", "guest1-dummy", "guest.dummy-1@x.y", "01-234-567891"];
const guest2 = ["6912", "guest2-dummy", "guest.dummy-2@x.y", "01-234-567892"];
const guest3 = ["6913", "guest3-dummy", "guest.dummy-3@x.y", "01-234-567893"];
const guest4 = ["6914", "guest4-dummy", "guest.dummy-4@x.y", "01-234-567894"];
const guest5 = ["6915", "guest5-dummy", "guest.dummy-5@x.y", "01-234-567895"];

const date_from1 = 1;
const assign1 = new eAssign(location1.id, table1.id, date_from1, guest1[0], guest1[1], guest1[2], guest1[3]);
const assign2 = new eAssign(location1.id, table1.id, date_from1, guest2[0], guest2[1], guest2[2], guest2[3]);
const assign3 = new eAssign(location1.id, table1.id, date_from1, guest3[0], guest3[1], guest3[2], guest3[3]);

const assign4 = new eAssign(location2.id, table5.id, date_from1, guest4[0], guest4[1], guest4[2], guest4[3]);
const assign5 = new eAssign(location2.id, table5.id, date_from1, guest5[0], guest5[1], guest5[2], guest5[3]);


repo.save_location(location1);
repo.save_table(table1);
repo.save_table(table2);
repo.save_table(table3);

repo.save_location(location2);
repo.save_table(table4);
repo.save_table(table5);


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
    expect(repo.size_assign_g2t()).toBe(5);
})

test('should return all 5 assignments if passing all parameter as undefined', () => {
    const all_guest_on_table = repo.filter_assign_g2t(undefined, undefined, undefined,
        undefined, undefined);
    expect(all_guest_on_table).toBeDefined();
    expect(all_guest_on_table.length).toBe(5);
})

test('should return all 5 assignments if passing no parameter', () => {
    const all_guest_on_table = repo.filter_assign_g2t();
    expect(all_guest_on_table).toBeDefined();
    expect(all_guest_on_table.length).toBe(5);
})

test('should return list of assignments if passing only location and table', () => {
    const all_guest_on_table = repo.filter_assign_g2t(location1.id, table1.id);
    expect(all_guest_on_table).toBeDefined();
    expect(all_guest_on_table.length).toBe(3);
    expect(all_guest_on_table[0]).toBe(assign1);
    expect(all_guest_on_table[1]).toBe(assign2);
    expect(all_guest_on_table[2]).toBe(assign3);
})

test('should return empty list of assignments if passing location1 and wrong table2', () => {
    const all_guest_on_table = repo.filter_assign_g2t(location1.id, table2.id);
    expect(all_guest_on_table).toBeDefined();
    expect(all_guest_on_table.length).toBe(0);
})

test('should return empty list of assignments if passing location2 and wrong table4', () => {
    const all_guest_on_table = repo.filter_assign_g2t(location2.id, table4.id);
    expect(all_guest_on_table).toBeDefined();
    expect(all_guest_on_table.length).toBe(0);
})

test('should return list of assignments if passing only location1', () => {
    const all_guest_on_table = repo.filter_assign_g2t(location1.id);
    expect(all_guest_on_table).toBeDefined();
    expect(all_guest_on_table.length).toBe(3);
    expect(all_guest_on_table[0]).toBe(assign1);
    expect(all_guest_on_table[1]).toBe(assign2);
    expect(all_guest_on_table[2]).toBe(assign3);
})

test('should return list of assignments if passing only location2', () => {
    const all_guest_on_table = repo.filter_assign_g2t(location2.id);
    expect(all_guest_on_table).toBeDefined();
    expect(all_guest_on_table.length).toBe(2);
    expect(all_guest_on_table[0]).toBe(assign4);
    expect(all_guest_on_table[1]).toBe(assign5);
})

test('should return all 5 assignments if passing only date_from1', () => {
    const all_guest_on_table = repo.filter_assign_g2t(undefined, undefined, undefined,
        date_from1);
    expect(all_guest_on_table).toBeDefined();
    expect(all_guest_on_table.length).toBe(5);
})
