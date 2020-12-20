"use strict";

class IGatewayLocation {
    /**
     * The database gateway for entity 'Location'.
     * This interfaces defines the needed methods for DB operation.
     */
    save_location(location) {}
    load_location(id) {}
    remove_location(id) {}
    size_location() {}
}

module.exports = IGatewayLocation;
