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

        // NOTE: opens connection!
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
            const e_loc = await mLocation.create({name: location.name}, {raw: true});
            return new eLocation(e_loc.dataValues.id, e_loc.dataValues.name);
        } catch (err) {
            console.error("Method save_location fails!", err)
            // todo: better throw err?
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
            console.error("Method load_location fails!", err)
            // todo: better throw err?
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
            console.error("Method update_location fails!", err)
            // todo: better throw err?
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
            return new eLocation(id, "location-removed");
        } catch(err) {
            console.error("Method remove_location fails!", err)
            // todo: better throw err?
            return undefined;
        }
    }

    async load_all_locations() {
        try {
            const result = await mLocation.findAll({raw: true});
            if(result.length == 0) {
                return [];
            }
            return result.map(r => new eLocation(r.id, r.name));

        } catch(err) {
            console.error("Method load_all_locations fails!", err)
            // todo: better throw err?
            return undefined;
        }
    }

    async size_location() {
        try {
            const result = await mLocation.findAndCountAll({raw: true});
            return result.count;

        } catch(err) {
            console.error("size_location fails!", err)
            // todo: better throw err?
            return undefined;
        }
    }
    /* ----- location END ----- */

    /* ----- table START ----- */
    async save_table(table) {
        try {
            const result = await mTable.create({name: table.name, location_id: table.location_id}, {raw: true});
            return new eTable(result.dataValues.id, result.dataValues.name, result.dataValues.location_id);
        } catch (err) {
            console.error("Method save_table fails!", err)
            // todo: better throw err?
            return undefined;
        }
    }

    async load_table(id, location_id) {
        try {
            const result = await mTable.findOne({where: {id: id, location_id: location_id}}, {raw: true});
            return new eTable(result.dataValues.id, result.dataValues.name, result.dataValues.location_id);
        } catch (err) {
            console.error("Method load_table fails!", err)
            // todo: better throw err?
            return undefined;
        }
    }

    async update_table(table) {
        try {
            const result = await mTable.update({name: table.name}, {where: {id: table.id, location_id: table.location_id}}, {raw: true});
            if(result[0] == 0) {
                // zero record could be updated
                return undefined;
            }
            return table;
        } catch(err) {
            console.error("Method update_table fails!", err)
            // todo: better throw err?
            return undefined;
        }
    }

    async remove_table(id, location_id) {
        try {
            const result = await mTable.destroy({where: {id: id, location_id: location_id}}, {force: true});
            if(result == 0) {
                // zero record could be removed
                return undefined;
            }
            return new eTable(id, "table-removed", location_id);
        } catch(err) {
            console.error("Method remove_table fails!", err)
            // todo: better throw err?
            return undefined;
        }
    }

    async load_all_tables() {
        try {
            const result = await mTable.findAll({raw: true});
            if(result.length == 0) {
                return [];
            }
            return result.map(r => new eTable(r.id, r.name, r.location_id));

        } catch(err) {
            console.error("Method load_all_tables fails!", err)
            // todo: better throw err?
            return undefined;
        }
    }

    async size_table() {
        try {
            const result = await mTable.findAndCountAll({raw: true});
            return result.count;

        } catch(err) {
            console.error("size_table fails!", err)
            // todo: better throw err?
            return undefined;
        }
    }
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
    /* ----- assign-guest-to-table END ----- */
}

module.exports = GuestRegistrationPostgres;
