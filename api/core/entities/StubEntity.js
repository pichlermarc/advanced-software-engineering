"use strict";

// the business-objects or business-models

class StubEntity {
    constructor(id, location = null) {
        this.id = id;
        this.name = location;
    }
}

module.exports = StubEntity;
