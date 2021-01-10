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
    async save_location(location) {
        // template of sequelize and usage of db-models:
        // https://github.com/hidjou/classsed-orms-sequelize

        // todo: return raw-js-object from DB => does NOT work!
        // https://stackoverflow.com/a/43411373/7421890
        try {
            const {id, name} = location;
            const e_loc = await mLocation.create({name: name}, {raw: true});
            return new eLocation(e_loc.dataValues.id, e_loc.dataValues.name);
        } catch (err) {
            console.error("save_location fails!", err)
            return undefined;
        }
    }

    async load_location(id) {
        try {
            // const e_loc = mLocation.findOne({where: id}, {raw: true})
            //     .then((v) => {
            //         console.log(v)
            //         return new eLocation(v.dataValues.id, v.dataValues.name);
            //     })
            //     .catch((err) => {
            //         console.error("load_location fails!", err)
            //         return undefined;
            //     });

            // If it is easier, use this syntax for the async JS stuff. just put await before DB calls.
            // This has to be in "async" functions. Errors are handled via try/catch.
            const e_loc = await mLocation.findOne({where: id}, {raw: true});
            //console.log(e_loc)
            return new eLocation(e_loc.dataValues.id, e_loc.dataValues.name);
            // TODO: why is return-stmt needed ?!?! Only needed in case of promise, which the new demoonstrated syntax doesnt need.
            // It was needed since the jest framework finished the test function before the async call was conpleted, Therefore the
            // promise had to be returned to jest/test-function.
//            return e_loc;
        } catch (err) {
            console.error("load_location fails!", err)
            console.log("Error save_location:", err);
            return undefined;
        }
    }

    async update_location(location) {
        // update DB: https://stackoverflow.com/a/61648385/7421890
        try {
            const e_loc = await mLocation.update({name: location.name}, {where: {id: location.id}}, {raw: true});
            if(e_loc[0] == 0) {
                // zero record could be updated
                return undefined;
            }
            return location;
        } catch(err) {
            console.error("update_location fails!", err)
            console.log("Error update_location:", err);
            return undefined;
        }
    }

    async remove_location(id) {
        try {
            const e_loc = await mLocation.destroy({where: {id: id}}, {force: true});
            if(e_loc == 0) {
                // zero record could be removed
                return undefined;
            }
            return new eLocation(id, "name");
        } catch(err) {
            console.error("remove_location fails!", err)
            console.log("Error remove_location:", err);
            return undefined;
        }
    }
    load_all_locations() {
        /*this.pool.query('select * from location;')
            .then(res => {return res})
            .catch(throw new Error("Not implemented yet!"));*/
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
