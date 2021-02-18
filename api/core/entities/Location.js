"use strict";

class eLocation {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }

    static from_object(o) {
        return new eLocation(o.id, o.name)
    }

    accept(r) {
        return r.report(this);
    }
}

module.exports = eLocation;
