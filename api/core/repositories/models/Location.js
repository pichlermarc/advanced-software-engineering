/*
module.exports = (sequelize, DataTypes) => {
    const Location = sequelize.define("location", { // NOTE: auto-pluralization for models in implicit!
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        name: {
            allowNull: false,
            type: DataTypes.STRING,
        }
    })
    return Location;
}
 */

const {DataTypes} = require('sequelize');
const name = require('path').basename(__filename, '.js');

const db_connect = require('../index');
const create_config = require("../../config")

const cnf = create_config();

const sequelize = db_connect(cnf);

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

module.exports = Model;
