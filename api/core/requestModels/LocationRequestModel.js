"use strict";

class LocationRequestModel {
    /**
     * The requestmodel is the input data-structure for the interactor.
     * It is a raw data object an stores the necessary fields needed for the use-case.
     * Please note:
     *   The naming "Request" has nothing to do with a HTTP request!
     *   The requestmodel is only the input for the interactor.
     */
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
}

module.exports = LocationRequestModel;
