"use strict";

const IGatewayGuestRegistration = require('../gateways/IGatewayGuestRegistration');
//const Location = require('../entities/Location')
//const Table = require('../entities/Table')

class GuestRegistrationInMemRepository extends IGatewayGuestRegistration {
    constructor() {
        super();
        this.location_repo = [];
        this.table_repo = [];
        //this.guest_repo = [];
        //this.assign_guest_to_table_repo = [];
    }
    /* ----- location START ----- */
    save_location(location) { this.location_repo.push(location); }
    load_location(id) {
        let location;
        if (id === undefined) // for GET /locations route
            location = this.location_repo;
        else {
            location = this.location_repo.find(l => l.id == id);
        }
        return location;
    }
    remove_location(id) {
        const location = this.load_location(id);
        this.location_repo = this.location_repo.filter(l => l.id != id);
        return location;
    }
    size_location() { return this.location_repo.length; }
    clear_location() { this.location_repo = []; }
    /* ----- location END ----- */
}

module.exports = GuestRegistrationInMemRepository;