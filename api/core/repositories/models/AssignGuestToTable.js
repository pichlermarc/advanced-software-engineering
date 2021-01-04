/*
module.exports = (sequelize, DataTypes) => {
    const AssignGuestToTable = sequelize.define("assignguesttolocation", { // NOTE: auto-pluralization for models in implicit!
        location_id: {
            allowNull: false,
            type: DataTypes.ID,
        },
        table_id: {
            allowNull: false,
            type: DataTypes.ID
        },
        date_from: {
            allowNull: false,
            defaultValue: Sequelize.NOW,
            type: DataTypes.DATETIME_LOCAL_SECONDS,
        },
        first_name: {
            allowNull: false,
            type: DataTypes.STRING
        },
        last_name: {
            allowNull: false,
            type: DataTypes.STRING
        },
        phone: {
            allowNull: false,
            type: DataTypes.STRING
        },
        email: {
            allowNull: false,
            type: DataTypes.STRING
        },
    })

    AssignGuestToTable.associate = (models) => {
        AssignGuestToTable.belongsTo(models.Location, {
            through: "location",
            foreignKey: "location_id"
        });
        AssignGuestToTable.belongsTo(models.Table, {
            through: "table",
            foreignKey: "table_id"
        })
    }

    return AssignGuestToTable;
}
*/
const {DataTypes} = require('sequelize');
const name = require('path').basename(__filename, '.js');

const db_connect = require('../index');
const create_config = require("../../config")

const cnf = create_config();

const sequelize = db_connect(cnf);

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
        //defaultValue: Sequelize.NOW,
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
    /*AssignGuestToTable.belongsTo(models.Location, {
            through: "location",
            foreignKey: "location_id"
        });
        AssignGuestToTable.belongsTo(models.Table, {
            through: "table",
            foreignKey: "table_id"
        })*/
};

module.exports = Model;
