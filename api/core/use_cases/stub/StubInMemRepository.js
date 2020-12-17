"use strict";

const IGateway = require('../../gateways/IGateway');

class StubInMemRepository extends IGateway {
    constructor() {
        super();
        this.repo = [];
    }
    save(stub_entity) {
        this.repo.push(stub_entity);
    }
    load(id) {
        const entity_found = this.repo.find(e => e.id == id);
        return entity_found;
    }
    remove(id) {
        const entitiy_remove = this.load(id);
        this.repo = this.repo.filter(e => e.id != id);
        return entitiy_remove;
    }
    size() { return this.repo.length; }
    clear() { this.repo = []; }
}

module.exports = StubInMemRepository;
