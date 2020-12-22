"use strict";

const multifilter = require('../util/multifilter');
const IGatewayGuestRegistration = require('../gateways/IGatewayGuestRegistration');

/**
 * 'all_undefined()' return true if all values in the array are undefined.
 * @param arr
 * @returns {*}
 */
const all_undefined = arr => arr.every(v => v === undefined);
const some_undefined = arr => arr.some(v => v === undefined);

class GuestRegistrationInMemRepository extends IGatewayGuestRegistration {
    constructor() {
        super();
        this.location_repo = [];
        this.table_repo = [];
        this.guest_repo = [];
        this.assign_g2t_repo = [];
    }

    load() {
        return [this.location_repo, this.table_repo, this.guest_repo, this.assign_g2t_repo];
    }
    clear() {
        this.location_repo = [];
        this.table_repo = [];
        this.guest_repo = [];
        this.assign_g2t_repo = [];
    }

    /* ----- location START ----- */
    save_location(location) {
        let location_load = this.load_location(location.id);
        if(location_load !== undefined) {
            throw new Error("Repo: Location with id #" + location.id + " already exists!");
        }
        this.location_repo.push(location);
    }
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
            throw new Error("Repo: Location with id #" + table.location_id + " does not exist! Create location first!")
        }
        let table_load = this.load_table(table.id);
        if(table_load !== undefined) {
            throw new Error("Repo: Table with id #" + table.id + " already exists!");
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
    save_guest(guest) {
        let guest_load = this.load_guest(guest.id);
        if(guest_load !== undefined) {
            throw new Error("Repo: Guest with id #" + guest.id + " already exists!");
        }
        this.guest_repo.push(guest);
    }
    load_guest(id) {
        let guest;
        if (id === undefined) {
            guest = this.guest_repo;
        } else {
            guest = this.guest_repo.find(g => g.id == id);
        }
        return guest;
    }
    remove_guest(id) {
        const guest = this.load_guest(id);
        this.guest_repo = this.guest_repo.filter(g => g.id != id);
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

        if(some_undefined([location, table, guest])) {
            throw new Error("Repo: FK Constraint violated: Location, table or guest is not existing!");
        }

        let assign_load = this.load_assign_g2t(assign.location_id, assign.table_id, assign.guest_id,
            assign.date_from, assign.date_to)
        if(assign_load !== undefined) {
             throw new Error("Repo: Assignment already exists!");
        }
        this.assign_g2t_repo.push(assign);
    }
    load_assign_g2t(location_id, table_id, guest_id, date_from, date_to) {
        let assign;
        if (arguments.length == 0) {
            // return all assignments
            assign = this.assign_g2t_repo;
        } else {
            assign = this.assign_g2t_repo.find(a =>
                a.location_id == location_id &&
                a.table_id == table_id &&
                a.guest_id == guest_id &&
                    a.date_from == date_from &&
                    a.date_to == date_to
            );
            if(assign !== undefined && assign.length == 1) {
                // all args are set -> search for special assignment
                assign = assign[0]
            } else if(assign === undefined || assign.length == 0) {
                assign = undefined;
            }
        }
        return assign;
    }
    filter_assign_g2t(location_id, table_id, guest_id, date_from, date_to) {
        let assign;
        if (arguments.length == 0) {
            // return all assignments
            assign = this.assign_g2t_repo;
        } else {
            // filter assignments
            const filters = {
                location_id: [location_id],
                table_id: [table_id],
                guest_id: [guest_id],
                date_from: [date_from],
                date_to: [date_to]
            };
            //let assign = multifilter(this.assign_g2t_repo, filters);
            assign = this.assign_g2t_repo.filter((a) => {
                    return
                (location_id !== undefined && a.location_id == location_id && table_id !== undefined && a.table_id == table_id && a.guest_id == guest_id) ||
                (location_id !== undefined && a.location_id == location_id && table_id !== undefined && a.table_id == table_id) ||
                (location_id !== undefined && a.location_id == location_id);
                }
            );
        }
        return assign;
    }
    remove_assign_g2t(id) {
        const assign = this.load_assign_g2t(id);
        this.assign_g2t_repo = this.assign_g2t_repo.filter(t => arguments);
        return assign;
    }
    size_assign_g2t() { return this.assign_g2t_repo.length; }
    clear_assign_g2t() { this.assign_g2t_repo = []; }
    /* ----- assign-guest-to-table END ----- */
}

module.exports = GuestRegistrationInMemRepository;
