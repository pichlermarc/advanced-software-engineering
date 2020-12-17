"use strict";

const IValidator = require('../../validation/IValidator');
const ValidationResult = require('../../validation/ValidationResult');

class StubValidator extends IValidator {
    constructor() {
        super();
    }

    validate(request) {
        if(request.id < 0) {
            return new ValidationResult("Id must not be smaller than zero!");
        }

        return new ValidationResult();
    }
}

module.exports = StubValidator;
