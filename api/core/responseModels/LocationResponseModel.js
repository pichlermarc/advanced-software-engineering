"use strict";

class LocationResponseModel {
    /**
     * The responsemodel is the output data-structure coming from the interactor.
     * It is a raw data object an stores the answer of the executed use-case.
     * Please note:
     *   The naming "Response" has nothing to do with a HTTP response!
     *   The responsemodel is only the output from the interactor.
     */
    constructor(id, location = null, error_msg = null) {
        this.id = id;
        this.location = location;
        this.error_msg = error_msg;
    }
}

module.exports = LocationResponseModel;
