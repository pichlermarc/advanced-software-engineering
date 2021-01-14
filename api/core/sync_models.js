"use strict";
/*
 * Run 'npm sync_models.js' to sync the models with the database.
 *
 * Tutorial: Working code for sequelize version v6:
 * https://www.youtube.com/watch?v=3qlnR9hK-lQ
 */

//const {sequelize} = require("./repositories/models")
const create_db_models = require("./repositories/models")
const create_config = require("./config")

let sequelize;

async function sync_models(sync_options = null, config=null) {
    if (sync_options == null) {
        sync_options = {force: true};
    }
    console.log("sync-options: ", sync_options);

    if(config === null) {
        config = create_config()
    }

    console.log("Try sync models with postgres database...")
    try {
        sequelize = await create_db_models(config).sequelize

        // NOTE: open connection to DB before sync!
        //await sequelize.sequelize.authenticate();
        await sequelize.sync(sync_options)
        console.log("Synced models OK")
        /*
         *   NOTE: keeps connection open -> close manually!
         */
    } catch(err) {
        console.error('Sync-models: database-error:', err);
        sequelize.close();
        process.exit;
    };
}


if (require.main === module) {
    sync_models()
      .then(() => {
          sequelize.close();      // close connection after executing module!
          console.log("Closed DB connection after successful sync.")
      })
      .catch(err => {
          console.error("Error executing module 'sync_models.js'!", err)
      });
}


module.exports = sync_models;
