"use strict";

class IGatewayLocation {

    // CRUD ... create, read, update, delete

    save_location(location) {}
    load_location(id) {}
    update_location(id) {}
    remove_location(id) {}
    load_all_locations() {}
    size_location() {}

    save_table(table) {}
    load_table(id) {}
    update_table(id) {}
    remove_table(id) {}
    load_all_tables(location_id) {}
    size_table() {}

    save_assign_g2t(assign) {}
    load_assign_g2t(location_id, table_id, guest_id, date_from, date_to) {}
    remove_assign_g2t(id) {}
    size_assign_g2t() {}
    clear_assign_g2t() {}
}

module.exports = IGatewayLocation;
