
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
