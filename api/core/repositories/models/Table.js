
module.exports = (sequelize, DataTypes) => {
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
}
