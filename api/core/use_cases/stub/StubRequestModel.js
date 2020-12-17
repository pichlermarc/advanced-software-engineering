"use strict";

class StubRequestModel {
    constructor(id) {
        console.log("StubRequestModel: %d", id);
        this.id = id;
    }
}

module.exports = StubRequestModel;
