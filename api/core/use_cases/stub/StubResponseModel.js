"use strict";

class StubResponseModel {
    constructor(id, location = null, error_msg = null) {
        this.id = id;
        this.location = location;
        this.error_msg = error_msg;
    }
}