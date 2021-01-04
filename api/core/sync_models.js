"use strict";

/*
 * Run 'npm sync_models.js' to sync the models with the database.
 */

const { create_models, sync_models } = require("./repositories/models")

const create_config = require("./config");
const config = create_config();

create_models(config);
sync_models(config);
