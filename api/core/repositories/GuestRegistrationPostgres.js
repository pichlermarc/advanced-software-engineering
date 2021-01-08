"use strict";

//const create_config = require("../config");
//const create_db_connection = require("./index")
const IGatewayGuestRegistration = require('../gateways/IGatewayGuestRegistration');
const {sequelize, mLocation, mTable, mAssign} = require("./models")
const {eLocation, eTable, eAssign} = require("../entities")

// docu of node-postgres:
// https://node-postgres.com/

class GuestRegistrationPostgres extends IGatewayGuestRegistration {

    constructor() {
        super();
        //this.db = create_db_connection(config);
        this.db = sequelize;
        this.db.authenticate();
    }

    connection_close() {
        this.db.close()
    }

    /* ----- location START ----- */
    save_location(location) {
        // template of sequelize and usage of db-models:
        // https://github.com/hidjou/classsed-orms-sequelize

        // todo: return raw-js-object from DB => does NOT work!
        // https://stackoverflow.com/a/43411373/7421890
        try {
            const e_loc = mLocation.create(location, {raw: true})
                .then((v) => {
                    console.log(v)
                    return new eLocation(v.dataValues.id, v.dataValues.name);
                })
                .catch((err) => {
                    console.error("save_location fails!", err)
                    return undefined;
                });
            // TODO: why is return-stmt needed ?!?!
            return e_loc;
        } catch (err) {
            console.log("Error save_location:", err);
            return undefined;
        }
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
