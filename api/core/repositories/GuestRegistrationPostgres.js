"use strict";

const IGatewayGuestRegistration = require('../gateways/IGatewayGuestRegistration');
const { Pool } = require('pg');
// docu of node-postgres:
// https://node-postgres.com/

class GuestRegistrationPostgres extends IGatewayGuestRegistration {

    constructor(config) {
        super();
        this.pool = new Pool({
            user: 'postgres',
            host: 'localhost',
            database: config.db_name,
            password: config.db_passwd,
            port: config.db_port
        });
    }

    /* ----- location START ----- */
    save_location(location) {
        /*this.pool.query('insert into location(id, name) values($1, $2)', [location.id, location.name])
          .then(res => {return res})
          .catch(throw new Error("Not implemented yet!"));*/
    }
    load_location(id) {
        /*
        this.pool.query('select * from location where location.id=$1', id)
          .then(res => {return res})
          .catch(throw new Error("Not implemented yet!"));*/
    }
    load_all_locations() {
        /*this.pool.query('select * from location;')
            .then(res => {return res})
            .catch(throw new Error("Not implemented yet!"));*/
    }
    remove_location(id) {
        throw new Error("Not implemented yet!")
    }
    size_location() { throw new Error("Not implemented yet!") }
    clear_location() { throw new Error("Not implemented yet!") }
    /* ----- location END ----- */

    /* ----- table START ----- */
    save_table(table) {
        throw new Error("Not implemented yet!")
    }
    load_table(id) {
        throw new Error("Not implemented yet!")
    }
    remove_table(id) {
        throw new Error("Not implemented yet!")
    }
    size_table() { throw new Error("Not implemented yet!") }
    clear_table() { throw new Error("Not implemented yet!") }
    /* ----- table END ----- */

    /* ----- guest START ----- */
    save_guest(guest) {
        throw new Error("Not implemented yet!")
    }
    load_guest(id) {
        throw new Error("Not implemented yet!")
    }
    remove_guest(id) {
        throw new Error("Not implemented yet!")
    }
    size_guest() { throw new Error("Not implemented yet!") }
    clear_guest() { throw new Error("Not implemented yet!") }
    /* ----- guest END ----- */

    /* ----- assign-guest-to-table START ----- */
    save_assign_g2t(assign) {
        throw new Error("Not implemented yet!")
    }
    load_assign_g2t(location_id, table_id, guest_id, date_from, date_to) {
        throw new Error("Not implemented yet!")
    }
    filter_assign_g2t(location_id, table_id, guest_id, date_from, date_to) {
        throw new Error("Not implemented yet!")
    }
    remove_assign_g2t(id) {
        throw new Error("Not implemented yet!")
    }
    size_assign_g2t() { throw new Error("Not implemented yet!") }
    clear_assign_g2t() { throw new Error("Not implemented yet!") }
    /* ----- assign-guest-to-table END ----- */
}

module.exports = GuestRegistrationPostgres;
