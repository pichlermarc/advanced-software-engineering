"use strict";

class IGatewayLocation {

    // CRUD ... create, read, update, delete

    save_location(location) {}
    load_location(id) {}
    update_location(location) {}
    remove_location(id) {}
    load_all_locations() {}
    size_location() {}

    save_table(table) {}
    load_table(id, location_id) {}
    update_table(table) {}
    remove_table(id, location_id) {}
    load_all_tables(location_id) {}
    size_table() {}

    save_assign(assign) {}
    load_assign(assign) {}
    filter_assign(where_clause) {}
    load_all_assigns() {}
    size_assign() {}
}

module.exports = IGatewayLocation;
