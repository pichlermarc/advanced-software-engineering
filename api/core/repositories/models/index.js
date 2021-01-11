/*
 * The models/index.js imports all model-file in 'models' directory and
 * creates an object 'db' that can be synchronized with the postgres DB.
 * Tutorial: Working code for sequelize version v6:
 * https://www.youtube.com/watch?v=3qlnR9hK-lQ
 */
const fs = require('fs');
const path = require('path');
const { Sequelize } = require('sequelize');
const create_db_connection = require('../index');
const create_config = require("../../config")

const basename = path.basename(__filename);

const env = process.env.NODE_ENV || "development";
const cnf = create_config(env);


//console.log("Try create models for postgres database...")

const db = {};
const sequelize = create_db_connection(cnf);

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

//console.log("Create models OK")


module.exports = db
