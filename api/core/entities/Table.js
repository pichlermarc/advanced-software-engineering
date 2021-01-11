"use strict";

class eTable {
    constructor(id, name, location_id) {
        this.id = id;
        this.name = name;
        this.location_id = location_id;
    }

    static from_object(o) {
        return new eTable(o.id, o.name, o.location_id)
    }
}

module.exports = eTable;
