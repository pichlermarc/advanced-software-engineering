"use strict";

const ResponseModel = require('../responseModels/LocationsResponseModel');
const TableEntity = require('../entities/Table');

class GetLocationTablesInteractor {
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
    constructor(repository, validator) {
        this.repository = repository;
        this.validator = validator;
    }

    // 1. call process use-case
    execute(request_model) {
        // 2. validation
        let validation_result = this.validator.validate(request_model);
        if(!validation_result.isValid) {
            const response_model = new ResponseModel(null,
                validation_result.error_msg);
            return response_model;
        }

        // 3. DB interaction
        let tables = this.repository.load_table();
        tables = tables.filter(table => table.location_id === request_model.id);

        // 4. return response
        const response_model = new ResponseModel(tables, null);
        return response_model;
    }
}

module.exports = GetLocationTablesInteractor;
