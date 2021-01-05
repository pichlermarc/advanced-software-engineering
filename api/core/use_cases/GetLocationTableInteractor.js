"use strict";

const ResponseModel = require('../responseModels/EntityResponseModel');

class GetLocationTableInteractor {
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
        let foundtables = tables.filter(t => t.location_id === request_model.location_id && t.id === request_model.table_id);

        // 4. return response
        let response_model;
/*        if (foundtables.length > 1) {
            response_model = new ResponseModel(null, `Found more than one
            table with the specified tableid(${request_model.table_id})
            at the location with the specified locationId(${request_model.location_id})!`);
        } else */ if (foundtables.length === 1) { // successful retrieval of the given table from the given location
            response_model = new ResponseModel(foundtables[0], null);
        } else { // in case table with tableId does not exist at location with locationId
            response_model = new ResponseModel(null, `No table with id=${request_model.table_id} at location with id=${request_model.location_id}`);
        }
        return response_model;
    }
}

module.exports = GetLocationTableInteractor;
