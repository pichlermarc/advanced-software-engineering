"use strict";

const IGatewayGuestRegistration = require('../../../../core/gateways/IGatewayGuestRegistration');

class FakeGuestRegistrationInMemRepository extends IGatewayGuestRegistration {
    constructor() {
        super();

        this.location_save_was_called = false;
        this.location_load_was_called = false;
        this.location_remove_was_called = false;
        this.location_received = null;

        this.table_save_was_called = false;
        this.tablen_load_was_called = false;
        this.table_remove_was_called = false;
        this.table_received = null;

        this.guest_save_was_called = false;
        this.guest_load_was_called = false;
        this.guest_remove_was_called = false;
        this.guest_received = null;

        this.assignment_save_was_called = false;
        this.assignment_load_was_called = false;
        this.assignment_remove_was_called = false;
        this.assignment_received = null;
    }

    load() {
        return [[this.location_received], [this.table_received], [this.guest_received], [this.assignment_received]];
    }
    clear() {
        this.location_save_was_called = false;
        this.location_load_was_called = false;
        this.location_remove_was_called = false;
        this.location_received = null;

        this.table_save_was_called = false;
        this.tablen_load_was_called = false;
        this.table_remove_was_called = false;
        this.table_received = null;

        this.guest_save_was_called = false;
        this.guest_load_was_called = false;
        this.guest_remove_was_called = false;
        this.guest_received = null;

        this.assignment_save_was_called = false;
        this.assignment_load_was_called = false;
        this.assignment_remove_was_called = false;
        this.assignment_received = null;
    }

    /* ----- location START ----- */
    save_location(location) {
        this.location_save_was_called = true;
        if(this.location_received != null && this.location_received.id == location.id) {
            throw new Error("Repo: Location with id #" + location.id + " already exists!");
        }
        this.location_received = location;
    }
    load_location(id) {
        this.location_load_was_called = true;
        if(id === undefined) {
            if(this.location_received == null) {
                return [];
            }
            return [this.location_received];
        }
        if(this.location_received == null || this.location_received.id != id) {
            return null;
        }
        return this.location_received;
    }
    remove_location(id) {
        this.location_remove_was_called = true;
        if(id === undefined) {
            return [this.location_received];
        }
        if(this.location_received.id != id) {
            return null;
        }
        this.location_received = null;
    }
    size_location() {
        if (this.location_received == null) {
            return 0;
        }
        return 1;
    }
    clear_location() { this.location_received = null; }
    /* ----- location END ----- */

    /* ----- table START ----- */
    save_table(table) {
        this.table_save_was_called = true;
        if(this.table_received != null && this.table_received.id == table.id) {
            throw new Error("Repo: Table with id #" + table.id + " already exists!");
        }
        if(this.location_received == null || this.location_received.id != table.location_id) {
            throw new Error("Repo: Location with id #" + table.location_id + " does not exist! Create location first!")
        }
        this.table_received = table;
    }
    load_table(id) {
        this.table_load_was_called = true;
        if(id === undefined) {
            if(this.table_received == null) {
                return [];
            }
            return [this.table_received];
        }
        if(this.table_received == null || this.table_received.id != id) {
            return null;
        }
        return this.table_received;
    }
    remove_table(id) {
        this.table_remove_was_called = true;
        if(this.table_received.id != id) {
            return null;
        }
        this.table_received = null;
    }
    size_table() {
        if (this.table_received == null) {
            return 0;
        }
        return 1;
    }
    clear_table() { this.table_received = null; }
    /* ----- table END ----- */

    /* ----- guest START ----- */
    save_guest(guest) {
        this.guest_save_was_called = true;
        if(this.guest_received != null && this.guest_received.id == guest.id) {
            throw new Error("Repo: Location with id #" + guest.id + " already exists!");
        }
        this.guest_received = guest;
    }
    load_guest(id) {
        this.guest_load_was_called = true;
        if(id === undefined) {
            if(this.guest_received == null) {
                return [];
            }
            return [this.guest_received];
        }
        if(this.guest_received == null || this.guest_received.id != id) {
            return null;
        }
        return this.guest_received;
    }
    remove_guest(id) {
        this.guest_remove_was_called = true;
        if(this.guest_received.id != id) {
            return null;
        }
        this.guest_received = null;
    }
    size_guest() {
        if (this.guest_received == null) {
            return 0;
        }
        return 1;
    }
    clear_guest() { this.guest_received = null; }
    /* ----- guest END ----- */

    /* ----- assign-guest-to-table START ----- */
    save_assign_g2t(assign) {
        this.assignment_save_was_called = true;
        if(this.location_received == null || this.location_received.id != assign.location_id) {
            throw new Error("Repo: Location with id #" + assign.location_id + " does not exist! Create location first!")
        }
        if(this.table_received == null || this.table_received.id != assign.table_id) {
            throw new Error("Repo: Table with id #" + assign.table_id + " does not exist! Create table first!");
        }
        if(this.guest_received == null || this.guest_received.id != assign.guest_id) {
            throw new Error("Repo: Guest with id #" + assign.guest_id + " does not exist! Create guest first!");
        }

        if(this.assignment_received != null && this.assignment_received.location_id == assign.location_id &&
        this.assignment_received.table_id == assign.table_id && this.assignment_received.guest_id == assign.guest_id &&
        this.assignment_received.date_from == assign.date_from && this.assignment_received.date_to == assign.date_to) {
            throw new Error("Repo: Assignment already exists!");
        }
        this.assignment_received = assign;
    }
    load_assign_g2t(location_id, table_id, guest_id, date_from, date_to) {
        this.location_load_was_called = true;
        if(arguments.length == 0) {
            if(this.assignment_received == null) {
                return [];
            }
            return [this.assignment_received];
        }
        return this.assignment_received;
    }
    filter_assign_g2t(location_id, table_id, guest_id, date_from, date_to) {
        return [];
    }
    remove_assign_g2t(id) {
        this.assignment_remove_was_called = true;
        this.assignment_received = null;
    }
    size_assign_g2t() {
        if (this.assignment_received == null) {
            return 0;
        }
        return 1;
    }
    clear_assign_g2() { this.assignment_received = null; }
    /* ----- assign-guest-to-table END ----- */
}

module.exports = FakeGuestRegistrationInMemRepository;
