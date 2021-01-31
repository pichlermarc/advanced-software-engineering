"use strict";

const IValidator = require('../validation/IValidator');
const ValidationResult = require('../validation/ValidationResult');

class ReportValidator extends IValidator {
    /**
     * Validator validates the input - the request-model - of the interactor and
     * returns an object of type ValidationResult.
     */
    constructor() {
        super();
    }

    validate(request) { // ReportRequestModel
        if(request.location_id < 0 || request.table_id < 0) {
            return new ValidationResult("Id must not be less than zero!");
        } else if(!request.datetimeFrom || !request.datetimeTo) {
            return new ValidationResult("From-time and To-time are needed for request!");
        } else if(request.datetimeFrom >= Date.now() || request.datetimeTo < request.datetimeFrom) {
            return new ValidationResult("From-time must be in the past and To-time must be later than From-time!");
        }

        return new ValidationResult();
    }
}

module.exports = ReportValidator;
