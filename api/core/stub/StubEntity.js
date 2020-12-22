"use strict";

// the business-objects or business-models

class StubEntity {
    constructor(id, name = null) {
        this.id = id;
        this.name = name;
    }
}

module.exports = StubEntity;
