"use strict";

class Assign {
    constructor(location_id, table_id, date_from, first_name, last_name, phone, email) {
        this.location_id = location_id;
        this.table_id = table_id;
        this.date_from = date_from;
        // guest data from gov-requironment:
        // https://images.derstandard.at/2020/09/25/StadtWien20CTGastroA4L3_1.pdf
        this.first_name = first_name;
        this.last_name = last_name;
        this.phone = phone;
        this.email = email;
    }
}

module.exports = Assign;
