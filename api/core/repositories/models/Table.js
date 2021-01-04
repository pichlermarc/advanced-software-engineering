
/*module.exports = (sequelize, DataTypes) => {
    const Table = sequelize.define("table", { // NOTE: auto-pluralization for models in implicit!
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        name: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        location_id: {
            allowNull: false,
            type: DataTypes.ID
        }
    })

    Table.associate = (models) => {
        Table.belongsTo(models.Location, {
            through: "location",
            foreignKey: "location_id"
        })
    }

    return Table;
}*/

const {DataTypes} = require('sequelize');
const name = require('path').basename(__filename, '.js');

const db_connect = require('../index');
const create_config = require("../../config")

const cnf = create_config();

const sequelize = db_connect(cnf);

const Model = sequelize.define(name, {
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
    tableName: name,
});

Model.associate = models => {
    /*Table.belongsTo(models.Location, {
        through: "location",
        foreignKey: "location_id"
    })*/
};

module.exports = Model;
