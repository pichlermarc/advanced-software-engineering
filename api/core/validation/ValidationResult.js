"use strict";

class ValidationResult {
    constructor(errorMessage) {
        if(errorMessage === null) {
            this.isValid = true;
            this.error_msg = null;
        } else {
            this.error_msg = errorMessage;
            this.isValid = false;
        }
    }
}

module.exports = ValidationResult;
