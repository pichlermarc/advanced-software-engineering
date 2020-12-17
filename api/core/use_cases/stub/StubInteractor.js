"use strict";

const StubResponseModel = require('./StubResponseModel');
const StubEntity = require('../../entities/StubEntity');

class StubInteractor {
    constructor(repository, validator) {
        this.repository = repository;
        this.validator = validator;
    }

    execute(request) {
        // 1. validation
        let validation_result = this.validator.validate(request);
        if(!validation_result.isValid) {
            const response = new StubResponseModel(request.id,
                null,
                validation_result.getErrorMessage());
            return response;
        }

        // 2. DB interaction
        const stub_entity = new StubEntity(request.id, "stub");
        this.repository.save(stub_entity);

        // 3. return response
        const response = new StubResponseModel(request.id, stub_entity.location);
        return response;
    }
}

module.exports = StubInteractor;
