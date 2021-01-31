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
        } else if(!request.datetimeFrom && request.datetimeFrom <= Date.now()) {
            return new ValidationResult("From-time is needed for request and must be in the past!");
        } else if(!request.datetimeTo && request.datetimeTo > request.datetimeFrom) {
            return new ValidationResult("To-time is needed for request and must be later than From-time!");
        }

        return new ValidationResult();
    }
}

module.exports = ReportValidator;
