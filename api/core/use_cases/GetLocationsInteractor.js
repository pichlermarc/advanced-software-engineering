"use strict";

const ResponseModel = require('../responseModels/LocationsResponseModel');

class GetLocationsInteractor {
    /**
     * The interactor represents one use-case respectively it processes on use-case.
     * The used design-pattern is the 'command pattern'.
     *
     * The communication with the interactor is done with:
     *   - the request-model: contains all input data for the use-case;
     *   - the response-model: contains the output of the use-case.
     *
     * The stub use-case:
     *   Data: id
     *   1. User issues "get location" with above data (id).
     *   2. System validates data.
     *   3. System creates new entity and determines locatation-name.
     *   4. System delivers location-name to user.
     */
    constructor(repository) {
        this.repository = repository;
    }

    // 1. call process use-case
    execute() {
        // 2. validation not needed since no input/request data

        // 3. DB interaction
        const locations = this.repository.load_location();

        // 4. return response
        const response_model = new ResponseModel(locations);
        return response_model;
    }
}

module.exports = GetLocationsInteractor;
