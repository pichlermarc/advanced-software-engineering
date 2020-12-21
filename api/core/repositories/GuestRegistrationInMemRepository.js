"use strict";

const IGatewayGuestRegistration = require('../gateways/IGatewayGuestRegistration');

class GuestRegistrationInMemRepository extends IGatewayGuestRegistration {
    constructor() {
        super();
        this.location_repo = [];
        this.table_repo = [];
        this.guest_repo = [];
        this.assign_g2t_repo = [];
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

    /* ----- assign-guest-to-table START ----- */
    save_assign_g2t(assign) {
        let location = this.load_location(assign.location_id);
        let table = this.load_table(assign.table_id);
        let guest = this.load_guest(assign.guest_id);

        const all_undefined = arr => arr.every(v => v === undefined);
        if(all_undefined([location, table, guest])) {
            // todo: implement and throw error?
            return undefined;
        }

        this.assign_g2t_repo.push(assign);
    }
    load_assign_g2t(id) {
        let assign;
        if (id === undefined) {
            assign = this.assign_g2t_repo;
        } else {
            assign = this.assign_g2t_repo.find(t => t.id == id);
        }
        return assign;
    }
    remove_assign_g2t(id) {
        const assign = this.load_assign_g2t(id);
        this.assign_g2t_repo = this.assign_g2t_repo.filter(t => t.id != id);
        return assign;
    }
    size_assign_g2t() { return this.assign_g2t_repo.length; }
    clear_assign_g2t() { this.assign_g2t_repo = []; }
    /* ----- assign-guest-to-table END ----- */
}

module.exports = GuestRegistrationInMemRepository;
