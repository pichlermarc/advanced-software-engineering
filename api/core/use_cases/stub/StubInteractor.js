"use strict";

const StubResponseModel = require('./StubResponseModel');
const StubEntity = require('../../entities/StubEntity');

class StubInteractor {
    /**
     * The interactor represents the one use-case respectively it processes on use-case.
     * The used design-pattern for the interactor is the 'command pattern'.
     * The request-model contains all input data for the use-case; its output is stored
     *  in the response-model.
     * @param repository used repository.
     * @param validator used validator that validates input data.
     *
     * The stub use-case:
     *   Data: id
     *   1. User issues "get location" with above data (id).
     *   2. System validates data.
     *   3. System creates new entity and determines locatation-name.
     *   4. System delivers location-name to user.
     */
    constructor(repository, validator) {
        this.repository = repository;
        this.validator = validator;
    }

    // 1. call process use-case
    execute(request) {
        // 2. validation
        let validation_result = this.validator.validate(request);
        if(!validation_result.isValid) {
            const response = new StubResponseModel(request.id,
                null,
                validation_result.error_msg);
            return response;
        }

        // 3. DB interaction
        const stub_entity = new StubEntity(request.id, "stub");
        this.repository.save(stub_entity);

        // 4. return response
        const response = new StubResponseModel(request.id, stub_entity.location);
        return response;
    }
}

module.exports = StubInteractor;
