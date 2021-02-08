"use strict";

const sequelize = require('sequelize');
const Assign = require('../entities/Assign');
const ResponseModel = require('../responseModels/ActivityResponseModel');

class GetLocationTableActivityInteractor {
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
        let response_model;
        let where = {
            location_id: request_model.location_id,
            table_id: request_model.table_id,
            date_from: {
                [sequelize.Op.between]: [Date.parse(request_model.from), Date.parse(request_model.to)]
            }
        }
        try {
            let activityCount = await this.repository.get_table_activity(where);
            response_model = new ResponseModel(activityCount,
                null,
                200);
        } catch (e) {
            response_model = new ResponseModel(null, e.message, 400);
        }

        // 4. return response
        return response_model;
    }
}

module.exports = GetLocationTableActivityInteractor;
