"use strict";

const {Model} = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class mAssign extends Model {
        static associate({mLocation, mTable}) {

            this.belongsTo(mTable, {
                foreignKey: "table_id"
            })

            this.belongsTo(mLocation, {
                foreignKey: "location_id"
            })
        }
    };

    mAssign.init({
        location_id: {
            //primaryKey: true,
            allowNull: false,
            type: DataTypes.INTEGER,
        },
        table_id: {
            //primaryKey: true,
            allowNull: false,
            type: DataTypes.INTEGER,
        },
        date_from: {
            allowNull: false,
            type: DataTypes.BIGINT,
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
        modelName: "mAssign",
    });

    mAssign.removeAttribute("id");

    return mAssign;
};
