"use strict";

const multifilter = require('../util/multifilter');
const IGatewayGuestRegistration = require('../gateways/IGatewayGuestRegistration');

/**
 * 'all_undefined()' return true if all values in the array are undefined.
 * @param arr
 * @returns {*}
 */
const all_undefined = arr => arr.every(v => v === null);
const some_undefined = arr => arr.some(v => v === null);

class GuestRegistrationInMemRepository extends IGatewayGuestRegistration {
    constructor() {
        super();
        this.location_repo = [];
        this.table_repo = [];
        this.guest_repo = [];
        this.assign_repo = [];
    }

    load() {
        return [this.location_repo, this.table_repo, this.guest_repo, this.assign_repo];
    }
    clear() {
        this.location_repo = [];
        this.table_repo = [];
        this.guest_repo = [];
        this.assign_repo = [];
    }

    /* ----- location START ----- */
    save_location(location) {
        let location_load = this.load_location(location.id);
        if(location_load !== null) {
            throw new Error("Repo: Location with id #" + location.id + " already exists!");
        }
        this.location_repo.push(location);
        return location;
    }

    /**
     *
     * @param id
     * @returns null if no location with given id can be found
     *  Error if no id is given
     *  otherwise it returns the found location
     */
    load_location(id) {
        let location = this.location_repo.find(l => l.id == id);
        if (id === undefined) {
            throw new Error("Error in load_location: id is missing!");
        }
        if (location === undefined) {
            location = null; // same as in guestregistrationpostgres.js
        }
        return location;
    }

    /**
     *
     * @param location
     * @returns {*[]|undefined}
     *  undefined if theres no location that was updated
     *  array of locations that were updated
     *  error if something goes wrong
     */
    update_location(location) {
        try {
            let loc = this.load_location(location.id);
            if (loc) {
                let removed = this.remove_location(location.id);
                this.save_location(location);
            } else {
                return undefined;
            }
            return location;
        } catch (e) {
            throw new Error("Method update_location fails." + e);
        }
    }

    /**
     *
     * @param id
     * @returns {undefined|*}
     *  undefined if the location to be removed was not found in db
     *  if successful, return the location
     *  error if something goes wrong
     */
    remove_location(id) {
        try {
            const location = this.load_location(id);
            if (location) {
                this.location_repo = this.location_repo.filter(l => l.id != id);
                return location;
            } else {
                return undefined;
            }
        } catch (e) {
            throw new Error("Error in remove_location: location could not be removed." + e);
        }
    }
    load_all_locations() {
        return this.location_repo;
    }
    size_location() { return this.location_repo.length; }
    clear_location() { this.location_repo = []; }

    /* ----- location END ----- */

    /* ----- table START ----- */
    save_table(table) {
        // NOTE: location has to be in repo to create table for it!
        let location = this.load_location(table.location_id);
        if(location === null) {
            throw new Error("Repo: Location with id #" + table.location_id + " does not exist! Create location first!")
        }
        let table_load = this.load_table(table.id, table.location_id);
        if(table_load !== null) {
            throw new Error("Repo: Table with id #" + table.id + " already exists!");
        }
        this.table_repo.push(table);
        return table;
    }
    /**
     *
     * @param id
     * @returns null if no table with given id, location_id can be found
     *  Error if no id, location_id is given
     *  otherwise it returns the found table
     */
    load_table(id, location_id) {
        let table = this.table_repo.find(t => t.id == id && t.location_id === location_id);
        if (id === undefined) {
            throw new Error("Error in load_table: id is undefined!");
        }
        if(location_id === undefined) {
            throw new Error("Error in load_table: location_id is undefined!");
        }
        if (table === undefined) {
            table = null; // same as in guestregistrationpostgres.js
        }
        return table;
    }
    /**
     *
     * @param id
     * @returns undefined if no table with given id, location_id can be found
     *  Error if error occurred
     *  otherwise it returns the array of updated table(s)
     */
    update_table(table) {
        try {
            let tab = this.load_table(table.id, table.location_id);
            if (tab) {
                let removed = this.remove_table(table.id, table.location_id);
                this.save_table(table);
            } else {
                return undefined;
            }
            return table;
        } catch (e) {
            throw new Error("Method update_table fails! To be updated table could not be found" +e);
        }
    }

    /**
     *
     * @param id
     * @param location_id
     * @returns {*}
     *  undefined if the table to be removed was not found in db
     *  if successful, return the location
     *  error if something goes wrong

     */
    remove_table(id, location_id) {
        try {
            const table = this.load_table(id, location_id);
            if (table) {
                this.table_repo = this.table_repo.filter(t => t.id != id);
                return table;
            } else {
                return undefined;
            }
        } catch (e) {
            throw new Error("Error in remove_table: table could not be removed" + e);
        }
    }
    load_all_tables() {
        return this.table_repo;
    }
    size_table() { return this.table_repo.length; }
    clear_table() { this.table_repo = []; }

    get_table_activity(location_id, table_id, dateFrom, dateTo) {
        if(this.load_location(location_id) == null)
            throw new Error("Location not found!");

        if(this.load_table(table_id, location_id) == null)
            throw new Error("Table not found!");

        let assign = this.assign_repo.filter(a =>
            a.location_id == location_id &&
            a.table_id == table_id &&
            a.date_from >= Date.parse(dateFrom) &&
            a.date_from <= Date.parse(dateTo)
        );

        return assign.length;
    }

    /* ----- table END ----- */

    /* ----- assign-guest-to-table START ----- */
    save_assign(assign) {
        let location = this.load_location(assign.location_id);
        let table = this.load_table(assign.table_id, assign.location_id);

        if(some_undefined([location, table])) {
            throw new Error("Repo: FK Constraint violated: Location, or table is not existing!");
        }

        let assign_load = this.load_assign(assign.location_id, assign.table_id,
            assign.date_from, assign.first_name, assign.last_name);
        if(assign_load !== undefined) {
             throw new Error("Repo: Assignment already exists!");
        }
        this.assign_repo.push(assign);
    }
    load_assign(location_id, table_id, date_from, first_name, last_name) {
        let assign;
        if (arguments.length == 0) {
            // return all assignments
            assign = this.assign_repo;
        } else {
            assign = this.assign_repo.find(a =>
              a.location_id == location_id &&
              a.table_id == table_id &&
              a.date_from == date_from &&
              a.first_name == first_name &&
              a.last_name == last_name
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
    filter_assign(location_id, table_id, date_from, date_to) {
        let assign;
        if (arguments.length == 0) {
            // return all assignments
            assign = this.assign_repo;
        } else {
            // filter assignments
            let filters = {};
            /*const filters = {
                location_id: [location_id],
                table_id: [table_id],
                guest_id: [guest_id],
                date_from: [date_from],
                date_to: [date_to]
            };*/
            if(location_id !== undefined) {
                filters["location_id"] = [location_id];
            }
            if(table_id !== undefined) {
                filters["table_id"] = [table_id];
            }
            if(date_from !== undefined) {
                filters["date_from"] = [date_from];
            }
            if(date_to !== undefined) {
                 filters["date_to"] = [date_to];
            }
            assign = multifilter(this.assign_repo, filters);
        }
        return assign;
    }
    remove_assign(assignment) {
        const assign = this.load_assign(assignment.location_id,
            assignment.table_id,
            assignment.date_from,
            assignment.first_name,
            assignment.last_name);
        this.assign_repo = this.assign_repo.filter(a =>
            a.location_id != assignment.location_id &&
            a.table_id != assignment.table_id &&
            a.date_from != assignment.date_from &&
            a.first_name != assignment.first_name &&
            a.last_name != assignment.last_name);
        return assign;
    }
    size_assign() { return this.assign_repo.length; }
    clear_assign() { this.assign_repo = []; }
    /* ----- assign-guest-to-table END ----- */
}

module.exports = GuestRegistrationInMemRepository;
