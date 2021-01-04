"use strict";

const {Model} = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class AssignToGuestTable extends Model {
        static associate(models) {
        }
    };

    AssignToGuestTable.init({
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
        modelName: "AssignToGuestTable",
    });

    return AssignToGuestTable;
};
