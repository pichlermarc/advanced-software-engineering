"use strict";

class IGatewayTable {
    /**
     * The database gateway for entity 'Table'.
     * This interfaces defines the needed methods for DB operation.
     */
    save_table(guest) {}
    load_table(id) {}
    remove_table(id) {}
    size_table() {}
}

module.exports = IGatewayTable;
