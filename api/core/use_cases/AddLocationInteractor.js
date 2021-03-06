"use strict";

const AddLocationResponseModel = require('../responseModels/AddLocationResponseModel');
const Location = require('../entities/Location');

class AddLocationInteractor {
    constructor(repository, validator) {
        this.repository = repository;
        this.validator = validator;
    }

    // 1. call process use-case
    async execute(request_model) {
        // 2. validation
        let validation_result = this.validator.validate(request_model);
        if(!validation_result.isValid) {
            const response_model = new AddLocationResponseModel(request_model.id,
                null,
                validation_result.error_msg);
            return response_model;
        }

        // 3. DB interaction
        let response_model;
        try {
            const location = new Location(null, request_model.name);

            const newLocation = await this.repository.save_location(location);

            // 4. return response
            response_model = new AddLocationResponseModel(newLocation.id, newLocation.name);
        } catch (e) {
            console.error(e);
            response_model = new AddLocationResponseModel(request_model.id, null, e.message);
        }
        return response_model;
    }
}

module.exports = AddLocationInteractor;
