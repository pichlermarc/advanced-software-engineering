"use strict";
/*
 * Run 'npm sync_models.js' to sync the models with the database.
 *
 * Tutorial: Working code for sequelize version v6:
 * https://www.youtube.com/watch?v=3qlnR9hK-lQ
 */

const {sequelize} = require("./repositories/models")


async function sync_models(sync_options = null) {
    try {
        if (sync_options == null) {
            sync_options = {force: true};
        }
        console.log("sync-options: ", sync_options);

        console.log("Try sync models with postgres database...")
        await sequelize.sync(sync_options)
        console.log("Synced models OK")
        /*
         *   NOTE: keeps connection open -> close manually!
         */
    } catch(err) {
        console.error('Sync: Unable to connect to the database:', err);
        sequelize.close();
        process.exit;
    };
}

sync_models()
    .then(() => {
        sequelize.close();      // close connection after executing module!
        console.log("Closed DB connection after successful sync.")
    })
    .catch(err => {
        console.error("Error executing module 'sync_models.js'!", err)
    });

module.exports = sync_models;
