"use strict";

class LocationResponseModel {
    /**
     * The responsemodel is the output data-structure coming from the interactor.
     * It is a raw data object an stores the answer of the executed use-case.
     * Please note:
     *   The naming "Response" has nothing to do with a HTTP response!
     *   The responsemodel is only the output from the interactor.
     */
    constructor(entities = [], error_msg = null) {
        this.entities = entities;
        this.error_msg = error_msg;
    }
}

module.exports = LocationResponseModel;
