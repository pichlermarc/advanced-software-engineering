"use strict";

class IGatewayLocation {

    save_location(location) {}
    load_location(id) {}
    remove_location(id) {}
    size_location() {}

    save_table(table) {}
    load_table(id) {}
    remove_table(id) {}
    size_table() {}

    save_guest(guest) {}
    load_guest(id) {}
    remove_guest(id) {}
    size_guest() {}

    save_assign_g2t(assign) {}
    load_assign_g2t(location_id, table_id, guest_id, date_from, date_to) {}
    remove_assign_g2t(id) {}
    size_assign_g2t() {}
    clear_assign_g2t() {}
}

module.exports = IGatewayLocation;
