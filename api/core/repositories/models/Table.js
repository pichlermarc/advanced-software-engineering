"use strict";

const {Model} = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class mTable extends Model {
        static associate({mLocation, mAssign}) {
            // howto: https://www.youtube.com/watch?v=3qlnR9hK-lQ => min 27:44
            this.belongsTo(mLocation, {
                foreignKey: "location_id"
            })

            this.hasMany(mAssign, {
                foreignKey: "table_id"
            })
        }
    };

    mTable.init({
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
        modelName: "mTable",
    });

    return mTable;
};
