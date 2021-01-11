"use strict";

//const each = require('jest-each');
// jest-each: for parametrize tests
// https://github.com/mattphillips/jest-each

const GuestRegistrationInMemRepository = require('../../../core/repositories/GuestRegistrationInMemRepository');
const Location = require('../../../core/entities/Location');
const Table = require('../../../core/entities/Table');
const AssignGuestToTable = require('../../../core/entities/Assign');

let repo = new GuestRegistrationInMemRepository();

let location = new Location(4711, "location-dummy");
let table = new Table(5811, "table-dummy", location.id);

let date_from = 1;
let assign = new AssignGuestToTable(
    location.id, table.id,
    date_from,
    "Sepp", "Forcher",
    "+43 660 666",
    "sepp.forcher@schnorcher.at");

repo.save_location(location);
repo.save_table(table);

beforeEach(() => {
    repo.clear_assign_g2t();
})

test('fixture repo should be defined', () => {
    expect(repo).toBeDefined()
})

test('fixture location should be defined', () => {
    expect(location).toBeDefined()
})

test('fixture table should be defined', () => {
    expect(table).toBeDefined()
})

test('fixture assign should be defined', () => {
    expect(assign).toBeDefined()
})

const test_cases_nok = [
    [999, 888, 666, "f1", "n1", "01-001", "email1"],
    [999, table.id, date_from, "f2", "n2", "01-002", "email2"],
    [location.id, 888, date_from, "f3", "n3", "01-003", "email3"],
    [location.id, table.id, date_from, "f4", "n4", "01-004", "email4"],
    [location.id, table.id, 666, "f5", "n5", "01-005", "email5"],
    [location.id, table.id, date_from, "f6", "n6", "01-006", "email6"],
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
    let assign = new AssignGuestToTable(p[0], p[1], p[2], p[3], p[4], p[5], p[6]);
    expect(() => {
        repo.save_assign_g2t(assign);
    }).toThrowError(Error);
    expect(() => {
        repo.save_assign_g2t(assign);
    }).toThrowError(/^Repo: FK Constraint.*not existing!/);
})
test('should not create new assigment with wrong foreign key - location', () => {
    const p = test_cases_nok[1];
    let assign = new AssignGuestToTable(p[0], p[1], p[2], p[3], p[4], p[5], p[6]);
    expect(() => {
        repo.save_assign_g2t(assign);
    }).toThrowError(Error);
    expect(() => {
        repo.save_assign_g2t(assign);
    }).toThrowError(/^Repo: FK Constraint.*not existing!/);
})
test('should not create new assigment with wrong foreign key - table', () => {
    const p = test_cases_nok[2];
    let assign = new AssignGuestToTable(p[0], p[1], p[2], p[3], p[4], p[5], p[6]);
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
    let load_assign = repo.load_assign_g2t(
        assign.location_id, assign.table_id,
        assign.date_from,
        assign.first_name, assign.last_name,
        assign.phone, assign.email);
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
