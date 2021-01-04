"use strict";
/*
 * Run 'npm sync_models.js' to sync the models with the database.
 *
 * Tutorial: Working code for sequelize version v6:
 * https://www.youtube.com/watch?v=3qlnR9hK-lQ
 */
const create_models = require("./repositories/models")

const create_config = require("./config");
const config = create_config();

const sequelize = create_models(config);

async function sync_models() {
    console.log("Try sync models with postgres database...")
    await sequelize.sequelize.sync({force: true})
        .then(() => {
            console.log("Synced models OK")
        }).catch(err => {
            console.error('Unable to connect to the database:', err);
            process.exit;
        });
}

sync_models()
