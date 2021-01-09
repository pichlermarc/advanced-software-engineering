"use strict";

const IValidator = require('./IValidator');
const ValidationResult = require('./ValidationResult');

class AddLocationValidator extends IValidator {
    /**
     * Validator validates the input - the request-model - of the interactor and
     * returns an object of type ValidationResult.
     */
    constructor() {
        super();
    }

    validate(request) {
        if(request.name === "") {
            return new ValidationResult("Name must not be empty!");
        }

        return new ValidationResult();
    }
}

module.exports = AddLocationValidator;