"use strict";

const AddLocationResponseModel = require('../responseModels/AddLocationResponseModel');
const StubEntity = require('../entities/StubEntity');

class AddLocationInteractor {
    constructor(repository, validator) {
        this.repository = repository;
        this.validator = validator;
    }

    // 1. call process use-case
    execute(request_model) {
        // 2. validation
        let validation_result = this.validator.validate(request_model);
        if(!validation_result.isValid) {
            const response_model = new AddLocationResponseModel(request_model.id,
                null,
                validation_result.error_msg);
            return response_model;
        }

        // 3. DB interaction
        const stub_entity = new StubEntity(Math.floor(Math.random() * (100 - 1 + 1)) + 1, request_model.name);
        if(this.repository.load(stub_entity.id) === undefined)
            this.repository.save(stub_entity);

        // 4. return response
        const response_model = new AddLocationResponseModel(stub_entity.id, stub_entity.name);
        return response_model;
    }
}

module.exports = AddLocationInteractor;
