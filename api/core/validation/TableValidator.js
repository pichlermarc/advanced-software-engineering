"use strict";

const IValidator = require('../validation/IValidator');
const ValidationResult = require('../validation/ValidationResult');

class TableValidator extends IValidator {
    /**
     * Validator validates the input - the request-model - of the interactor and
     * returns an object of type ValidationResult.
     */
    constructor() {
        super();
    }

    validate(tableRequest) {
        if(tableRequest.id < 0 || tableRequest.location_id < 0) {
            return new ValidationResult("Table-Id and location-Id must not be less than zero!");
        }

        return new ValidationResult();
    }
}

module.exports = TableValidator;
