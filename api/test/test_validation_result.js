const assert = require('chai').assert;
const ValidationResult = require('../core/validation/ValidationResult');

describe('ValidationResult', function (){
    it('should return a valid validation-result when passing no parameter', function (){
        let validation_result = new ValidationResult()
        assert.equal(validation_result.isValid, true);
        assert.equal(validation_result.error_msg, null);
    });

    it('should return a valid validation-result when passing a null parameter', function (){
        let validation_result = new ValidationResult(null)
        assert.equal(validation_result.isValid, true);
        assert.equal(validation_result.error_msg, null);
    });

    it('should return a valid validation-result when passing an empty parameter string', function (){
        let validation_result = new ValidationResult(null)
        assert.equal(validation_result.isValid, true);
        assert.equal(validation_result.error_msg, null);
    });

    it('should return a valid validation-result when passing an non-string parameter', function (){
        let validation_result = new ValidationResult(5)
        assert.equal(validation_result.isValid, true);
        assert.equal(validation_result.error_msg, null);
    });

    it('should return an invalid validation-result when passing an parameter string', function (){
        let validation_result = new ValidationResult("my-error-message")
        assert.equal(validation_result.isValid, false);
        assert.equal(validation_result.error_msg, "my-error-message");
    });
});