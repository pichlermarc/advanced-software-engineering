"use strict";

class LocationResponseModel {
    /**
     * The responsemodel is the output data-structure coming from the interactor.
     * It is a raw data object an stores the answer of the executed use-case.
     * Please note:
     *   The naming "Response" has nothing to do with a HTTP response!
     *   The responsemodel is only the output from the interactor.
     */
    constructor(id, name = null, error_msg = null, status = null) {
        this.id = id;
        this.name = name;
        this.error_msg = error_msg;
        this.status = status;
    }
}

module.exports = LocationResponseModel;
