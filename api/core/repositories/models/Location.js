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
