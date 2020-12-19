"use strict";

class AddLocationResponseModel {
    constructor(id, location = null, error_msg = null) {
        this.id = id;
        this.location = location;
        this.error_msg = error_msg;
    }
}

module.exports = AddLocationResponseModel;
