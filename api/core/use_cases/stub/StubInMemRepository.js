"use strict";

const IGateway = require('../../gateways/IGateway');

class StubInMemRepository extends IGateway {
    constructor() {
        super();
        this.repo = {};
    }
    save(stub_entity) { this.repo[stub_entity.id] = stub_entity; }
    load(id) { return this.repo[id]; }
    remove(id) {
        const e = load(id);
        delete this.repo[id];
        return e;
    }
    size() { return this.repo.length; }
}

module.exports = StubInMemRepository;
