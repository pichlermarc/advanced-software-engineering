"use strict";

const LocationResponseModel = require('./LocationResponseModel');
const StubEntity = require('../../entities/StubEntity');

class LocationInteractor {
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
        let stub_entities = [];
        for (let i=0; i<this.repository.size(); i++) {
            stub_entities.push(this.repository.load(i));
        }

        // 4. return response
        const response_model = new LocationResponseModel(stub_entities, null);
        return response_model;
    }
}

module.exports = LocationInteractor;
