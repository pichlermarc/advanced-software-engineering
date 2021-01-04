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

const fs = require('fs');
const path = require('path');
const { Sequelize } = require('sequelize');

const db_connect = require('../index');
const create_config = require("../../config")

const basename = path.basename(__filename);
const cnf = create_config();

const create_models = (config) => {
    console.log("Try create models for postgres database...")

    const db = {};
    const sequelize = db_connect(cnf);

    // loop through directory 'models' and import any js file (db-model)
    fs
        .readdirSync(__dirname)
        .filter(filename => (filename.indexOf('.') !== 0) && (filename !== basename) && (filename.slice(-3) === ".js"))
        .forEach(file => {
            // import the model
            const model = require(path.join(__dirname, file))(
                // passes the 2 parameter for the ctor of each model
                sequelize,              // db-connection
                Sequelize.DataTypes,    // data-types from Sequelize
            );
            // add each model to db object
            db[model.name] = model;
        });

    Object.keys(db).forEach(model_name => {
        if(db[model_name].associate) {
            db[model_name].associate(db);
        }
    })

    db.sequelize = sequelize;

    console.log("Create models OK")
    return db;
};


/**
 * Will create all tables if the does not exist in the database.
 * @param config
 */
/*const sync_models = (config) => {
    console.log("Try sync models with postgres database...")
    //const models = create_models(config)
    db.sequelize.sync({force: true})
        .then(() => {
        console.log("Synced models OK")
    }).catch(err => {
        console.error('Unable to connect to the database:', err);
        process.exit;
    });
}*/

/*module.exports = {
    create_models,
    //sync_models,
    //models: db
};*/

module.exports = create_models;