/*const { Sequelize } = require('sequelize');

// example from:
// https://www.youtube.com/watch?v=BpEw1PNdvkg
// NOTE: only works vor sequelize v5!

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
}*/

const path = require('path');
const fs = require('fs');
const db_connect = require('../index');
const create_config = require("../../config")

const cnf = create_config();
const models = {};

module.exports = (() => {
    if (!Object.keys(models).length) {
        const sequelize = db_connect(cnf);
        const files = fs.readdirSync(__dirname);
        const excludedFiles = ['.', '..', 'index.js'];

        for(const fileName of files) {
            if(!excludedFiles.includes(fileName) && (path.extname(fileName) === '.js')) {
                const modelFile = require(path.join(__dirname, fileName));
                models[modelFile.getTableName()] = modelFile;
            }
        }

        Object
            .values(models)
            .forEach(model => {
                if(typeof model.associate === 'function') {
                    model.associate(models);
                }
            });

        models.sequelize = sequelize;
    }

    return models;
})();


/**
 * Will create all tables if the does not exist in the database.
 * @param config
 */
/*const sync_models = (config) => {
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
};*/