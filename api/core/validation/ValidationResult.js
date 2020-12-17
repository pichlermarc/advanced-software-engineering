"use strict";

class ValidationResult {
    constructor(errorMessage) {
        if(errorMessage == null) {
            this.isValid = true;
        } else {
            this.errorMessage = errorMessage;
            this.isValid = false;
        }
    }

    isValid() {
        return this.isValid;
    }

    getErrorMessage() {
        return this.errorMessage;
    }
}
