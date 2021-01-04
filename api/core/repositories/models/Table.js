"use strict";

const {Model} = require("sequelize");
//const {Location} = require(".")

module.exports = (sequelize, DataTypes) => {
    class Table extends Model {
        static associate({Location, Assign}) {
            // howto: https://www.youtube.com/watch?v=3qlnR9hK-lQ => min 27:44
            this.belongsTo(Location, {
                foreignKey: "location_id"
            })

            this.hasMany(Assign, {
                foreignKey: "table_id"
            })
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
        tableName: "tables",
        modelName: "Table",
    });

    return Table;
};
