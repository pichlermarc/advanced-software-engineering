"use strict";

const LocationResponseModel = require('../responseModels/LocationResponseModel');
const Location = require('../entities/Location');

class UpdateLocationByIdInteractor {
    constructor(repository, idvalidator, locationvalidator) {
        this.repository = repository;
        this.idvalidator = idvalidator;
        this.locationvalidator = locationvalidator;
    }

    // 1. call process use-case
    execute(location_request_model) {
        // 2. validation
        let validation_result_id = this.idvalidator.validate(location_request_model);
        let validation_result_location = this.locationvalidator.validate(location_request_model.name);
        if(!validation_result_id.isValid) {
            return this.generateErrorResponseModel(location_request_model, validation_result_id);
        } else if (!validation_result_location.isValid) {
            return this.generateErrorResponseModel(location_request_model, validation_result_location);
        }

        // 3. DB interaction UPDATE
        let response_model = new LocationResponseModel( // if updating non-existing location
          location_request_model.id,
          location_request_model.name, `Location ${location_request_model.name} does not exist`
        );
        try {
            if (this.repository.load_location(location_request_model.id)) { // if updating valid/existing location
                this.repository.remove_location(location_request_model.id);
                this.repository.save_location(location_request_model.name); // this is the new location not just the name
                response_model = new LocationResponseModel(location_request_model.name.id, location_request_model.name.name);
            }
        } catch (e) {
            response_model = new LocationResponseModel(location_request_model.id, null, e.message);
        }

        // 4. return response
        return response_model;
    }

    generateErrorResponseModel(requestmodel, validationResult) {
        let response_model = new LocationResponseModel(requestmodel.id,
          requestmodel.name.name,
          validationResult.error_msg);
        return response_model;
    };
}

module.exports = UpdateLocationByIdInteractor;
