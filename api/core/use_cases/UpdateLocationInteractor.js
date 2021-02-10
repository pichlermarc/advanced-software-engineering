"use strict";

const LocationResponseModel = require('../responseModels/LocationResponseModel');
const Location = require('../entities/Location');

class UpdateLocationInteractor {
    constructor(repository, validator) {
        this.repository = repository;
        this.validator = validator;
    }

    // 1. call process use-case
    async execute(location_request_model) {
        // 2. validation
        let validation_result = this.validator.validate(location_request_model);
        if(!validation_result.isValid) {
            const response_model = new LocationResponseModel(location_request_model.id,
                null,
                validation_result.error_msg,
                400);
            return response_model;
        }

        // 3. DB interaction UPDATE
        let response_model = new LocationResponseModel( // if updating non-existing location
          location_request_model.id,
          location_request_model.name, `Location ${location_request_model.name} does not exist`
        );
        try {
            if (await this.repository.load_location(location_request_model.id)) { // if updating valid/existing location
                await this.repository.update_location(location_request_model);
                response_model = new LocationResponseModel(location_request_model.id, location_request_model.name);
            }
        } catch (e) {
            response_model = new LocationResponseModel(location_request_model.id, null, e.message);
        }

        // 4. return response
        return response_model;
    }
}

module.exports = UpdateLocationInteractor;
