"use strict";

const {Model} = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Assign extends Model {
        static associate({Location, Table}) {

            this.belongsTo(Table, {
                foreignKey: "table_id"
            })

            this.belongsTo(Location, {
                foreignKey: "location_id"
            })
        }
    };

    Assign.init({
        location_id: {
            allowNull: false,
            type: DataTypes.INTEGER,
        },
        table_id: {
            allowNull: false,
            type: DataTypes.INTEGER,
        },
        date_from: {
            allowNull: false,
            defaultValue: DataTypes.NOW,
            type: DataTypes.DATE,
        },
        first_name: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        last_name: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        phone: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        email: {
            allowNull: false,
            type: DataTypes.STRING,
        },
    }, {
        sequelize,
        tableName: "assigns",
        modelName: "Assign",
    });

    return Assign;
};
