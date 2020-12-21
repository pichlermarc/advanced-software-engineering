"use strict";

const IGatewayGuestRegistration = require('../gateways/IGatewayGuestRegistration');

class GuestRegistrationInMemRepository extends IGatewayGuestRegistration {
    constructor() {
        super();
        this.location_repo = [];
        this.table_repo = [];
        this.guest_repo = [];
        //this.assign_guest_to_table_repo = [];
    }

    /* ----- location START ----- */
    save_location(location) { this.location_repo.push(location); }
    load_location(id) {
        let location;
        if (id === undefined) { // for GET /locations route
            location = this.location_repo;
        } else {
            location = this.location_repo.find(l => l.id == id);
        }
        return location;
    }
    remove_location(id) {
        const location = this.load_location(id);
        this.location_repo = this.location_repo.filter(l => l.id != id);
        return location;
    }
    size_location() { return this.location_repo.length; }
    clear_location() { this.location_repo = []; }
    /* ----- location END ----- */

    /* ----- table START ----- */
    save_table(table) {
        // NOTE: location has to be in repo to create table for it!
        let location = this.load_location(table.location_id);
        if(location === undefined) {
            // todo: implement and throw error?
            return undefined;
        }
        this.table_repo.push(table);
    }
    load_table(id) {
        let table;
        if (id === undefined) {
            table = this.table_repo;
        } else {
            table = this.table_repo.find(t => t.id == id);
        }
        return table;
    }
    remove_table(id) {
        const table = this.load_table(id);
        this.table_repo = this.table_repo.filter(t => t.id != id);
        return table;
    }
    size_table() { return this.table_repo.length; }
    clear_table() { this.table_repo = []; }
    /* ----- table END ----- */

    /* ----- guest START ----- */
    save_guest(guest) { this.guest_repo.push(guest); }
    load_guest(id) {
        let guest;
        if (id === undefined) {
            guest = this.guest_repo;
        } else {
            guest = this.guest_repo.find(t => t.id == id);
        }
        return guest;
    }
    remove_guest(id) {
        const guest = this.load_guest(id);
        this.guest_repo = this.guest_repo.filter(t => t.id != id);
        return guest;
    }
    size_guest() { return this.guest_repo.length; }
    clear_guest() { this.guest_repo = []; }
    /* ----- guest END ----- */
}

module.exports = GuestRegistrationInMemRepository;
