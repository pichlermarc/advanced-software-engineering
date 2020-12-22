const IGateway = require('../../../../../core/stub/IGateway')

class FakeStubInMemRepository extends IGateway {
    constructor() {
        super();
        this.saveMethodWasCalled = false;
        this.entityReceivedToTheSaveMethod = null;
    }
    save(stub_entity) {
        this.saveMethodWasCalled = true;
        return this.entityReceivedToTheSaveMethod = stub_entity;
    }
    load(id) {
        return this.entityReceivedToTheSaveMethod;
    }
    remove(id) {
        const entitiy_remove = this.entityReceivedToTheSaveMethod;
        this.entityReceivedToTheSaveMethod = null;
        return entitiy_remove;
    }
    size() {
        if(this.entityReceivedToTheSaveMethod === null) {
            return 0;
        }
        return 1;
    }
    clear() { this.entityReceivedToTheSaveMethod = null; }
}

module.exports = FakeStubInMemRepository;
