"use strict";

class IGatewayLocation {

    save_location(location) {}
    load_location(id) {}
    remove_location(id) {}
    size_location() {}

    save_table(guest) {}
    load_table(id) {}
    remove_table(id) {}
    size_table() {}

    save_guest(guest) {}
    load_guest(id) {}
    remove_guest(id) {}
    size_guest() {}

    /**
     * Stores the assignment: Guest sits on table in location at date.
     * @param guest The current guest.
     * @param location The current location.
     * @param table The current table.
     * @param date_from The arrival time.
     * @param date_to The leaving time.
     */
    save_assign_guest_to_table(guest, location, table, date_from, date_to) {}
    guest_was_on_table(guest, location, table, date_from, date_to) {}
    on_table_were_guests(location, table, date_from, date_to) {}

    size_assign_guest_to_table() {}
}

module.exports = IGatewayLocation;
