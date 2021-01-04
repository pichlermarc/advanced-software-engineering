"use strict";

const {Model} = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Table extends Model {
        static associate(models) {
        }
    };

    Table.init({
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
        location_id: {
            allowNull: false,
            type: DataTypes.INTEGER,
        },
    }, {
        sequelize,
        modelName: "Table",
    });

    return Table;
};
