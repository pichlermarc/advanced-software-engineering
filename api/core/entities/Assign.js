"use strict";

class eAssign {
    constructor(location_id, table_id, date_from, first_name, last_name, phone, email) {
        this.location_id = location_id;
        this.table_id = table_id;
        this.date_from = parseInt(date_from);
        //this.date_from = date_from;
        // guest data from gov-requironment:
        // https://images.derstandard.at/2020/09/25/StadtWien20CTGastroA4L3_1.pdf
        this.first_name = first_name;
        this.last_name = last_name;
        this.phone = phone;
        this.email = email;
    }

    static from_object(o) {
        return new eAssign(o.location_id, o.table_id, o.date_from,
            o.first_name, o.last_name, o.phone, o.email)
    }
}

module.exports = eAssign;
