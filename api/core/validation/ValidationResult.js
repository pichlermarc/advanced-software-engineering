"use strict";

var type = function(obj) {
    return Object.prototype.toString.apply(obj).replace(/\[object (.+)\]/i, '$1').toLowerCase();
};

class ValidationResult {
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
