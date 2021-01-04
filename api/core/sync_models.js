"use strict";

/*
 * Run 'npm sync_models.js' to sync the models with the database.
 */

const { sync_models } = require("./repositories/models")

const create_config = require("./config");
const config = create_config();

sync_models(config);
