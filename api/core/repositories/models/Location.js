"use strict";

const {Model} = require("sequelize");

/*
 * Constructor of model needs:
 *      - 'sequelize': db connection
 *      - 'Datatypes': types from Sequelize
 */
module.exports = (sequelize, DataTypes) => {
    class Location extends Model {
        static associate({Table, Assign}) {
            // howto: https://www.youtube.com/watch?v=3qlnR9hK-lQ => min 27:44
            this.hasMany(Table, {
                foreignKey: "location_id"
            })

            this.hasMany(Assign, {
                foreignKey: "location_id"
            })
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
        tableName: "locations",
        modelName: "Location",
    });

    return Location;
};
