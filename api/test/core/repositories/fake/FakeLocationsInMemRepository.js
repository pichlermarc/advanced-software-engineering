"use strict";

const IGateway = require('../../../../core/gateways/IGateway');
const StubEntity = require('../../../../core/entities/StubEntity')

class FakeLocationsInMemRepository extends IGateway {
    constructor() {
        super();
        this.repo = [];
    }
    save(locationEntity) {
        this.repo.push(locationEntity);
    }
    load(id) {
        let res;
        if (id === undefined) // for GET /locations route
            res = this.repo;
        else {
            res = this.repo.find(e => e.id == id);
        }
        return res;
    }
    remove(id) {
        const entitiy = this.load(id);
        this.repo = this.repo.filter(e => e.id != id);
        return entitiy;
    }
    size() { return this.repo.length; }
    clear() { this.repo = []; }
}

module.exports = FakeLocationsInMemRepository;
