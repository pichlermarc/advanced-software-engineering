"use strict";

class eTable {
    constructor(id, name, location_id, xCoordinate, yCoordinate) {
        this.id = id;
        this.name = name;
        this.location_id = location_id;
        this.xCoordinate = xCoordinate;
        this.yCoordinate = yCoordinate;
    }

    static from_object(o) {
        return new eTable(o.id, o.name, o.location_id, o.xCoordinate, o.yCoordinate)
    }

    accept(r) {
        return r.report(this);
    }
}

module.exports = eTable;
