"use strict";

class ActivityResponseModel {
    constructor(activity, error_msg = null, status = null) {
        this.activity = activity;
        this.error_msg = error_msg;
        this.status = status;
    }
}

module.exports = ActivityResponseModel;
