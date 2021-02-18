"use strict";

const {Model} = require("sequelize");

/*
 * Constructor of model needs:
 *      - 'sequelize': db connection
 *      - 'Datatypes': types from Sequelize
 */
module.exports = (sequelize, DataTypes) => {
    class mLocation extends Model {
        static associate({mTable, mAssign}) {
            // howto: https://www.youtube.com/watch?v=3qlnR9hK-lQ => min 27:44
            this.hasMany(mTable, {
                foreignKey: "location_id"
            })

            this.hasMany(mAssign, {
                foreignKey: "location_id"
            })
        }
    };

    mLocation.init({
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
        modelName: "mLocation",
    });

    return mLocation;
};
