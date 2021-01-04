"use strict";
/*
 * Run 'npm sync_models.js' to sync the models with the database.
 *
 * Tutorial: Working code for sequelize version v6:
 * https://www.youtube.com/watch?v=3qlnR9hK-lQ
 */
const create_config = require("./config");
const create_models = require("./repositories/models")

const env = process.env.NODE_ENV || "development";
const default_config = create_config(env);

async function sync_models(current_config=null, force_db_renew=null) {

    if(current_config == null) {
        current_config = default_config
    }

    const sequelize = create_models(current_config);

    console.log("Try sync models with postgres database...")
    await sequelize.sequelize.sync({force: true})
        .then(() => {
            console.log("Synced models OK")
        }).catch(err => {
            console.error('Sync: Unable to connect to the database:', err);
            process.exit;
        });
}

sync_models(default_config);

//module.exports = sync_models;
