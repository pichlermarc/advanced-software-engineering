"use strict";

class AssignGuestToTable {
    constructor(location_id, table_id, guest_id, date_from, date_to) {
        this.location_id = location_id;
        this.table_id = table_id;
        this.guest_id = guest_id;
        this.date_from = date_from;
        this.date_to = date_to;
    }
}

module.exports = AssignGuestToTable;
