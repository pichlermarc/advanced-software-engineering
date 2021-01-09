"use strict";
/*
 * Run 'npm sync_models.js' to sync the models with the database.
 *
 * Tutorial: Working code for sequelize version v6:
 * https://www.youtube.com/watch?v=3qlnR9hK-lQ
 */

const {sequelize} = require("./repositories/models")


async function sync_models(sync_options = null) {

    if(sync_options == null) {
        sync_options = {force: true};
    }
    console.log("sync-options: ", sync_options);

    console.log("Try sync models with postgres database...")
    await sequelize.sync(sync_options)
        .then(() => {
            console.log("Synced models OK")
        }).catch(err => {
            console.error('Sync: Unable to connect to the database:', err);
            process.exit;
        });
}

sync_models();
