"use strict";

class IGatewayAssignGuestToTable {
    /**
     * The database gateway for entity 'AssignGuestToTable'.
     * This interfaces defines the needed methods for DB operation.
     */

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

module.exports = IGatewayAssignGuestToTable;
