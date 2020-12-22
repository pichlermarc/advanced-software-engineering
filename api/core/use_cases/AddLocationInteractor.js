"use strict";

const AddLocationResponseModel = require('../responseModels/AddLocationResponseModel');
const Location = require('../entities/Location');

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
        const location = new Location(Math.floor(Math.random() * (100 - 1 + 1)) + 1, request_model.name);
        if(this.repository.load(location.id) === undefined) {
            this.repository.save(location);
        }

        // 4. return response
        const response_model = new AddLocationResponseModel(location.id, location.name);
        return response_model;
    }
}

module.exports = AddLocationInteractor;
