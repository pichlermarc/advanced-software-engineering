"use strict";

const ResponseModel = require('../responseModels/EntityResponseModel');
const Table = require('../entities/Table');
class DeleteLocationInteractor {

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
                405);
            return response_model;
        }

        // 3. DB interaction
        let response_model;
        let table = this.repository.load_table(request_model.table_id, request_model.location_id);
        if(table === null) {
            response_model = new ResponseModel(null, "The given location id or table id was not found in the database", 404);
        } else {
            const removed_id = this.repository.remove_table(request_model.table_id, request_model.location_id);
            if(removed_id != null) {
                response_model = new ResponseModel(table, null, 200);
            } else {
                response_model = new ResponseModel(null, "The given location id or table id was not found in the database", 404)
            }
        }


        // 4. return response
        return response_model;
    }
}

module.exports = DeleteLocationInteractor;
