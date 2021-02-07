"use strict";

const IValidator = require('../validation/IValidator');
const ValidationResult = require('../validation/ValidationResult');

class LocationIdTableIdGuestValidator extends IValidator {
    /**
     * Validator validates the input - the request-model - of the interactor and
     * returns an object of type ValidationResult.
     */
    constructor() {
        super();
    }

    validate(request) {
        if(request.location_id < 0 || request.table_id < 0) {
            return new ValidationResult("Id must not be less than zero!");
        } else if(request.guest.name === "") {
            return new ValidationResult("Name must not be empty!");
        } else if(request.guest.email === "") {
            return new ValidationResult("Email must not be empty!");
        } else if(request.guest.phoneNumber === "") {
            return new ValidationResult("Phone number must not be empty!");
        }

        return new ValidationResult();
    }
}

module.exports = LocationIdTableIdGuestValidator;
