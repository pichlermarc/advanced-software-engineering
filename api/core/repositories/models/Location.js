/*const {DataTypes} = require('sequelize');
const name = require('path').basename(__filename, '.js');

const create_db_connection = require('../index');
const create_config = require("../../config")

const cnf = create_config();

const sequelize = create_db_connection(cnf);

const Model = sequelize.define(name, {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    },
    name: {
        allowNull: false,
        type: DataTypes.STRING,
    },
}, {
    sequelize,
    tableName: name,
});

Model.associate = models => {
    // your model relations are here
};

module.exports = Model;*/

"use strict";

const {Model} = require("sequelize");

/*
 * Constructor of model needs:
 *      - 'sequelize': db connection
 *      - 'Datatypes': types from Sequelize
 */
module.exports = (sequelize, DataTypes) => {
    class Location extends Model {
        static associate(models) {
        }
    };

    Location.init({
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        name: {
            allowNull: false,
            type: DataTypes.STRING,
        }
    }, {
        sequelize,
        modelName: "Location",
    });

    return Location;
};
