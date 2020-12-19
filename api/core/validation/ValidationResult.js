"use strict";

var type = function(obj) {
    /**
     * Determines the type of the given parameter.
     */
    return Object.prototype.toString.apply(obj).replace(/\[object (.+)\]/i, '$1').toLowerCase();
};

class ValidationResult {
    /**
     * The result of the input validation.
     */
    constructor(errorMessage) {
        if(errorMessage == undefined || errorMessage === null) {
            this.isValid = true;
            this.error_msg = null
        } else if(type(errorMessage) !== 'string') {
            this.isValid = true;
            this.error_msg = null
        } else {
            this.error_msg = errorMessage;
            this.isValid = false;
        }
    }
}

module.exports = ValidationResult;
