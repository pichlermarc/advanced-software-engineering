"use strict";

class LocationIdTableIdRequestModel {
    /**
     * The requestmodel is the input data-structure for the interactor.
     * It is a raw data object an stores the necessary fields needed for the use-case.
     * Please note:
     *   The naming "Request" has nothing to do with a HTTP request!
     *   The requestmodel is only the input for the interactor.
     */
    constructor(location_id, table_id, table) {
        this.location_id = location_id;
        this.table_id = table_id;
        this.table = table;
    }
}

module.exports = LocationIdTableIdRequestModel;
