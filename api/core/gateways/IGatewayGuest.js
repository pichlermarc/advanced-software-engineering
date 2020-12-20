"use strict";

class IGatewayGuest {
    /**
     * The database gateway for entity 'Guest'.
     * This interfaces defines the needed methods for DB operation.
     */
    save_guest(guest) {}
    load_guest(id) {}
    remove_guest(id) {}
    size_guest() {}
}

module.exports = IGatewayGuest;
