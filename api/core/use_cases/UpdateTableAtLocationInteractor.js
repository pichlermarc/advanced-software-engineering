"use strict";

const ResponseModel = require('../responseModels/EntityResponseModel');
const Table = require('../entities/Table');
class UpdateTableAtLocationInteractor {

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
                validation_result.error_msg,
                400);
            return response_model;
        }

        // 3. DB interaction
        let response_model = new ResponseModel(null, "The given location id or table id was not found in the database", 404);
        let table = this.repository.update_table(request_model.table);
        if (table && table.length > 0) {
            response_model = new ResponseModel(table[0], null, 200);
        }


        // 4. return response
        return response_model;
    }
}

module.exports = UpdateTableAtLocationInteractor;
