"use strict";

const IGateway = require('../../gateways/IGateway');
const StubEntity = require('../../entities/StubEntity')

class AddLocationInMemRepository extends IGateway {
    constructor() {
        super();
        this.repo = [];
    }
    save(locationEntity) {
        this.repo.push(locationEntity);
    }
    load(id) {
        const entity = this.repo.find(e => e.id == id);
        return entity;
    }
    remove(id) {
        const entitiy = this.load(id);
        this.repo = this.repo.filter(e => e.id != id);
        return entitiy;
    }
    size() { return this.repo.length; }
    clear() { this.repo = []; }
}

module.exports = AddLocationInMemRepository;