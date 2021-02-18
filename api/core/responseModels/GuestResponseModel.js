"use strict";

class GuestResponseModel {
    constructor(phoneNumber, name, email, error_msg = null, status = null) {
        this.phoneNumber = phoneNumber;
        this.name = name;
        this.email = email;
        this.error_msg = error_msg;
        this.status = status;
    }
}

module.exports = GuestResponseModel;
