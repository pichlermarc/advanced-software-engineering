const { Sequelize } = require('sequelize');

// example from:
// https://www.youtube.com/watch?v=BpEw1PNdvkg

const create_models = (config) => {

    console.log("Try create models for postgres database...")

    const sequelize = new Sequelize(config.db_name,
        config.db_user, config.db_passwd,
        {dialect: "postgres"}
    );

    const models = {
        // NOTE: auto-pluralization for models in implicit!
        Location: sequelize.import("../../entities/Location"),
        Table: sequelize.import("../../entities/Tables"),
        AssignGuestToTable: sequelize.import("../../entities/AssignGuestToTable"),
    };

    Object.keys(models).forEach((model_name) => {
        if ("associate" in models[model_name]) {
            models[model_name].associate(models);
        }
    })

    models.sequelize = sequelize;
    return models;
}

/**
 * Will create all tables if the does not exist in the database.
 * @param config
 */
const sync_models = (config) => {
    console.log("Try sync models with postgres database...")
    const models = create_models(config)
    models.sequelize.sync({force: true})
        .then(() => {
        console.log("OK")
    });
}

module.exports = {
    create_models,
    sync_models
};