/*const {DataTypes, Sequelize} = require('sequelize');
const name = require('path').basename(__filename, '.js');

const create_db_connection = require('../index');
const create_config = require("../../config")

const cnf = create_config();

const sequelize = create_db_connection(cnf);

const Model = sequelize.define(name, {
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
        defaultValue: Sequelize.NOW,
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
    tableName: name,
});

Model.associate = models => {
    //AssignGuestToTable.belongsTo(models.Location, {
    //    through: "location",
    //    foreignKey: "location_id"
    //});
    //AssignGuestToTable.belongsTo(models.Table, {
    //    through: "table",
    //    foreignKey: "table_id"
    //})
};

module.exports = Model;
*/

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
