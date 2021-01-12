"use strict";

const Assign = require('../entities/Assign');
const ResponseModel = require('../responseModels/GuestResponseModel');

class RegisterGuestAtTableAtLocationInteractor {
    constructor(repository, validator) {
        this.repository = repository;
        this.validator = validator;
    }

    // 1. call process use-case
    execute(request_model) { // EntityRequestModel: id, entity(=table)
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
        let assign = new Assign(request_model.location_id,
            request_model.table_id,
            Date.now(),
            request_model.guest.name.split(' ')[0],
            request_model.guest.name.split(' ')[1],
            request_model.guest.phoneNumber,
            request_model.guest.email);
        try {
            this.repository.save_assign_g2t(assign);
            response_model = new ResponseModel(request_model.guest.phoneNumber,
                request_model.guest.name,
                request_model.guest.email,
                null,
                200);
        } catch (e) {
            response_model = new ResponseModel(null, null, null, e.message, 400);
        }

        // 4. return response
        return response_model;
    }
}

module.exports = RegisterGuestAtTableAtLocationInteractor;
