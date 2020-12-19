"use strict";

const IGateway = require('../gateways/IGateway');
const StubEntity = require('../../core/entities/StubEntity');
class InMemRepository extends IGateway {
    /**
     * The Repository for entity StubEntity.
     * It exists only at execution time and is NOT persistent!
     * The entities are stored and maintained in an array.
     *
     * Please note:
     *   This class represents the entity-gateway-implementation from
     *    the logical architecture view.
     */
    constructor() {
        super();
        this.repo = [
          new StubEntity(101, "Auenland"),
          new StubEntity(102, "Mordor"),
          new StubEntity(103, "Bruchtal")
          ];
    }
    save(stub_entity) {
        this.repo.push(stub_entity);
    }
    load(id) {
        const entity_found = this.repo[id];
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

module.exports = InMemRepository;
