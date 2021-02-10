"use strict";

const IValidator = require('../validation/IValidator');
const ValidationResult = require('../validation/ValidationResult');

class LocationIdTableIdTableValidator extends IValidator {
    /**
     * Validator validates the input - the request-model - of the interactor and
     * returns an object of type ValidationResult.
     */
    constructor() {
        super();
    }

    validate(request) {
        if(request.location_id < 0 || request.table_id < 0 || request.table.id < 0) {
            return new ValidationResult("Id must not be less than zero!");
        }
        if(request.table.name === "") {
            return new ValidationResult("Name must not be empty!");
        }
        if(request.table.xCoordinate == "" || request.table.yCoordinate == "") {
            return new ValidationResult("Values for coordinates must be given");
        }

        return new ValidationResult();
    }
}

module.exports = LocationIdTableIdTableValidator;
