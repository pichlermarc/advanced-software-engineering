
module.exports = (sequelize, DataTypes) => {
    const Location = sequelize.define("location", { // NOTE: auto-pluralization for models in implicit!
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        name: {
            allowNull: false,
            type: DataTypes.STRING,
        }
    })

    /* No associations for location */

    return Location;
}