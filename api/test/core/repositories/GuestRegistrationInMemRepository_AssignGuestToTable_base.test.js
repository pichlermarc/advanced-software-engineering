"use strict";

//const each = require('jest-each');
// jest-each: for parametrize tests
// https://github.com/mattphillips/jest-each

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

repo.save_location(location);
repo.save_table(table);
repo.save_guest(guest);

beforeEach(() => {
    repo.clear_assign_g2t();
})

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

test('fixture table should be defined', () => {
    expect(assign).toBeDefined()
})

const test_cases_nok = [
    [999, 888, 777, 666, 555],
    [999, table.id, guest.id, date_from, date_to],
    [location.id, 888, guest.id, date_from, date_to],
    [location.id, table.id, 777, date_from, date_to],
    [location.id, table.id, guest.id, 666, date_to],
    [location.id, table.id, guest.id, date_from, 555],
];

/*
// TODO: jest-each not working!
each(test_cases_nok
).test('should create new assigment and check for all repository constraints', () => {
    let assign = new AssignGuestToTable(999, 888, 777, 666, 555);
    expect(() => {
        repo.save_assign_g2t(assign);
    }).toThrowError(Error);
    expect(() => {
        repo.save_assign_g2t(assign);
    }).toThrowError(/^Repo: Constraint.*not existing!/);
});
*/

// TODO: remove that dangerous hack and get paramerized test working!
test('should not create new assigment with wrong foreign keys', () => {
    const p = test_cases_nok[0];
    let assign = new AssignGuestToTable(p[0], p[1], p[2], p[3], p[4]);
    expect(() => {
        repo.save_assign_g2t(assign);
    }).toThrowError(Error);
    expect(() => {
        repo.save_assign_g2t(assign);
    }).toThrowError(/^Repo: FK Constraint.*not existing!/);
})
test('should not create new assigment with wrong foreign key - location', () => {
    const p = test_cases_nok[1];
    let assign = new AssignGuestToTable(p[0], p[1], p[2], p[3], p[4]);
    expect(() => {
        repo.save_assign_g2t(assign);
    }).toThrowError(Error);
    expect(() => {
        repo.save_assign_g2t(assign);
    }).toThrowError(/^Repo: FK Constraint.*not existing!/);
})
test('should not create new assigment with wrong foreign key - table', () => {
    const p = test_cases_nok[2];
    let assign = new AssignGuestToTable(p[0], p[1], p[2], p[3], p[4]);
    expect(() => {
        repo.save_assign_g2t(assign);
    }).toThrowError(Error);
    expect(() => {
        repo.save_assign_g2t(assign);
    }).toThrowError(/^Repo: FK Constraint.*not existing!/);
})
test('should not create new assigment with wrong foreign key - guest', () => {
    const p = test_cases_nok[3];
    let assign = new AssignGuestToTable(p[0], p[1], p[2], p[3], p[4]);
    expect(() => {
        repo.save_assign_g2t(assign);
    }).toThrowError(Error);
    expect(() => {
        repo.save_assign_g2t(assign);
    }).toThrowError(/^Repo: FK Constraint.*not existing!/);
})

test('should save new assignment if all repository constraints are ok', () => {
    repo.save_assign_g2t(assign);
    expect(repo.size_assign_g2t()).toBe(1);
})

test('should return all assignments if no parameters passed to load_g2t', () => {
    repo.save_assign_g2t(assign);
    let assignment_list = repo.load_assign_g2t();
    expect(assignment_list.length).toBe(1);
    expect(assignment_list[0]).toBe(assign);
})

test('should return correct assignment after saving', () => {
    repo.save_assign_g2t(assign);
    let load_assign = repo.load_assign_g2t(assign.location_id, assign.table_id,
        assign.guest_id, assign.date_from, assign.date_to);
    expect(load_assign).toBeDefined();
    expect(load_assign).toBe(assign);
});

test('should throw an error if try to save an existing assignment', () => {
    repo.save_assign_g2t(assign);
    expect(() => {
        repo.save_assign_g2t(assign);
    }).toThrowError(Error);
    expect(() => {
        repo.save_assign_g2t(assign);
    }).toThrowError(/^Repo: Assignment already exists!$/);
})
