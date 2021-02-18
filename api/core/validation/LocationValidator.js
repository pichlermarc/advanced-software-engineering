"use strict";

const IValidator = require('../validation/IValidator');
const ValidationResult = require('../validation/ValidationResult');

class LocationValidator extends IValidator {
    /**
     * Validator validates the input - the request-model - of the interactor and
     * returns an object of type ValidationResult.
     */
    constructor() {
        super();
    }

    validate(locationRequest) {
        if(locationRequest.id < 0 || !locationRequest.name) {
            return new ValidationResult("Id must not be less than zero and location name must be not empty!");
        }

        return new ValidationResult();
    }
}

module.exports = LocationValidator;
