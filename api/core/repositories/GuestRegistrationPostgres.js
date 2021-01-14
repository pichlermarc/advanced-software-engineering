"use strict";

const IGatewayGuestRegistration = require('../gateways/IGatewayGuestRegistration');
//const {mLocation, mTable, mAssign} = require("./models")
const {eLocation, eTable, eAssign} = require("../entities")
const sync_models = require("../sync_models")
const create_db_models = require("./models")


class GuestRegistrationPostgres extends IGatewayGuestRegistration {

    constructor(config, sync_options=null) {
        super();
        // make the constructor async:
        this.config = config;
        this.db = create_db_models(config);
        this.sync_options = sync_options;
        if(sync_options === null) {
            this.sync_options = {force: true}
        }
    }

    async init() {
        // NOTE: opens DB connection!
        try {
            await this.db.sequelize.authenticate();
            this.sync_all_models();
            return "GuestRegistrationPostgres init() successful!";
        } catch (e) {
            console.error("Error initializing the db! (in guestregistrationpostgres.js - init():", e);
        }
    }

    async connection_close() {
        try {
            await this.db.sequelize.close()
        } catch(err) {
            console.error("Error on close db-connection:", err)
        }
    }

    async sync_all_models() {
        try {
            await sync_models(this.sync_options, this.config);
        } catch(err) {
            console.error("Error on sync_all_models:", err)
        }

    }

    /* ----- location START ----- */
    async save_location(location) {
        // template of sequelize and usage of db-models:
        // https://github.com/hidjou/classsed-orms-sequelize
        try {
            const result = await this.db.mLocation.create({name: location.name}, {raw: true});
            return eLocation.from_object(result.dataValues);
        } catch (err) {
            console.error("Method save_location fails!", err)
            throw err;
        }
    }

    async load_location(id) {
        try {
            const result = await this.db.mLocation.findOne({where: id}, {raw: true});
            return eLocation.from_object(result.dataValues);
        } catch (err) {
            console.error("Method load_location fails!", err)
            throw err;
        }
    }

    async update_location(location) {
        // update DB: https://stackoverflow.com/a/61648385/7421890
        try {
            const result = await this.db.mLocation.update({name: location.name}, {where: {id: location.id}}, {raw: true});
            if(result[0] == 0) {
                // zero record could be updated
                return undefined;
            }
            return location;
        } catch(err) {
            console.error("Method update_location fails!", err)
            throw err;
        }
    }

    async remove_location(id) {
        try {
            const result = await this.db.mLocation.destroy({where: {id}}, {force: true});
            if(result == 0) {
                // zero record could be removed
                return undefined;
            }
            return new eLocation(id, "location-removed");
        } catch(err) {
            console.error("Method remove_location fails!", err)
            throw err;
        }
    }

    async load_all_locations() {
        try {
            const result = await this.db.mLocation.findAll({raw: true});
            if(result.length == 0) {
                return [];
            }
            return result.map(r => eLocation.from_object(r));

        } catch(err) {
            console.error("Method load_all_locations fails!", err)
            throw err;
        }
    }

    async size_location() {
        try {
            const result = await this.db.mLocation.findAndCountAll({raw: true});
            return result.count;

        } catch(err) {
            console.error("Method size_location fails!", err)
            throw err;
        }
    }
    /* ----- location END ----- */

    /* ----- table START ----- */
    async save_table(table) {
        try {
            const result = await this.db.mTable.create({name: table.name, location_id: table.location_id}, {raw: true});
            return eTable.from_object(result.dataValues);
        } catch (err) {
            console.error("Method save_table fails!", err)
            throw err;
        }
    }

    async load_table(id, location_id) {
        try {
            const result = await this.db.mTable.findOne({where: {id: id, location_id: location_id}}, {raw: true});
            return eTable.from_object(result.dataValues);
        } catch (err) {
            console.error("Method load_table fails!", err)
            throw err;
        }
    }

    async update_table(table) {
        try {
            const result = await this.db.mTable.update({name: table.name}, {where: {id: table.id, location_id: table.location_id}}, {raw: true});
            if(result[0] == 0) {
                // zero record could be updated
                return undefined;
            }
            return table;
        } catch(err) {
            console.error("Method update_table fails!", err)
            throw err;
        }
    }

    async remove_table(id, location_id) {
        try {
            const result = await this.db.mTable.destroy({where: {id: id, location_id: location_id}}, {force: true});
            if(result == 0) {
                // zero record could be removed
                return undefined;
            }
            return new eTable(id, "table-removed", location_id);
        } catch(err) {
            console.error("Method remove_table fails!", err)
            throw err;
        }
    }

    async load_all_tables() {
        try {
            const result = await this.db.mTable.findAll({raw: true});
            if(result.length == 0) {
                return [];
            }
            return result.map(r => eTable.from_object(r));

        } catch(err) {
            console.error("Method load_all_tables fails!", err)
            throw err;
        }
    }

    async size_table() {
        try {
            const result = await this.db.mTable.findAndCountAll({raw: true});
            return result.count;

        } catch(err) {
            console.error("Method size_table fails!", err)
            throw err;
        }
    }
    /* ----- table END ----- */

    /* ----- assign-guest-to-table START ----- */
    async save_assign(assign) {
        //const {location_id,  table_id, date_from, first_name, last_name, phone, email} = assign;
        try {
            /* NOTE: assign contains all key-value pairs to pass it as values-object */
            const result = await this.db.mAssign.create(assign, {raw: true});
            return eAssign.from_object(result.dataValues);
            //return new eAssign(a.location_id, a.table_id, a.date_from, a.first_name, a.last_name, a.phone, a.email);
        } catch (err) {
            console.error("Method save_assign fails!", err)
            throw err;
        }
    }

    async load_assign(assign) {
        try {
            const result = await this.db.mAssign.findOne({where: assign}, {raw: true});
            return eAssign.from_object(result.dataValues);
        } catch (err) {
            console.error("Method load_assign fails!", err)
            throw err;
        }
    }

    /**
     *
     * @param where_clause: Plane JS object that conaints the keys that should be filtered for:
     *                      Filter key-value filters field-names and values.
     *                      Take a look on the tests to see examples!
     */
    async filter_assign(where_clause) {
        try {
            // remove key-value pairs that value is null
            where_clause = Object.fromEntries(Object.entries(where_clause).filter(([key, val]) => val !== null));
            const result = await this.db.mAssign.findAll({where: where_clause}, {raw: true});
            if(result.length == 0) {
                return [];
            }
            return result.map(r => eAssign.from_object(r.dataValues));

        } catch (err) {
            console.error("Method filter_assign fails!", err)
            throw err;
        }
    }

    async load_all_assigns() {
        try {
            const result = await this.db.mAssign.findAll({raw: true});
            if(result.length == 0) {
                return [];
            }
            return result.map(r => eAssign.from_object(r));

        } catch(err) {
            console.error("Method load_all_assigns fails!", err)
            throw err;
        }
    }

    async size_assign() {
        try {
            const result = await this.db.mAssign.findAndCountAll({raw: true});
            return result.count;

        } catch(err) {
            console.error("Method size_assign fails!", err)
            throw err;
        }
    }
    /* ----- assign-guest-to-table END ----- */
}

module.exports = GuestRegistrationPostgres;
