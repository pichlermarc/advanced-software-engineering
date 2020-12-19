"use strict";

class IGateway {
    /**
     * The database gateway.
     * This interfaces defines the needed methods for DB operation.
     */
    save(stub_entity) {}
    load(id) {}
    remove(id) {}
    size() {}
}

module.exports = IGateway;
