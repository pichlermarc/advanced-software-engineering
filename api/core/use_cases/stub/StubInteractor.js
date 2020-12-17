"use strict";

class StubInteractor {
    constructor(repository, validator) {
        this.repository = repository;
        this.validator = validator;
    }

    execute(request) {
        // 1. validation
        const validation_result = this.validator.validate(request);
        if(!validation_result.isValid()) {
            const response = new StubResponseModel(request.id,
                null,
                validation_result.getErrorMessage());
            return response;
        }

        // 2. DB interaction
        const stub_entity = new StubEntity(request.id);
        this.repository.save(stub_entity);

        // 3. return response
        const response = new StubResponseModel(request.id, "stub");
        return response;
    }
}