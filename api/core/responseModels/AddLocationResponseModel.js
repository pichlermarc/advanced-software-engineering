"use strict";

class AddLocationResponseModel {
    constructor(id, name = null, error_msg = null) {
        this.id = id;
        this.name = name;
        this.error_msg = error_msg;
    }
}

module.exports = AddLocationResponseModel;
