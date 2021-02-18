"use strict";

const ResponseModel = require('../responseModels/EntityResponseModel');
const Table = require('../entities/Table');

class UpdateTableAtLocationInteractor {

    constructor(repository, validator) {
        this.repository = repository;
        this.validator = validator;
    }

    // 1. call process use-case
    async execute(request_model) {
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
        let table = await this.repository.load_table(request_model.table_id, request_model.location_id);
        if (table) {
            table.name = request_model.table.name;
            table = await this.repository.update_table(table);
            response_model = new ResponseModel(table, null, 200);
        }


        // 4. return response
        return response_model;
    }
}

module.exports = UpdateTableAtLocationInteractor;
