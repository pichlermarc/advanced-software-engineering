const {Sequelize} = require('sequelize');
/*
 * This factory method creates a connection via sequelize to the DB.
 * A valid config has to be passed to.
 */
let connection = null;

const create_db_connection = (config) => {
    if(!connection) {
        try {
            connection = new Sequelize({
                database: config.db_name,
                username: config.db_user,
                password: config.db_passwd,
                host: config.host_name,
                port: config.db_port,
                dialect: config.db_dialect,
            });

        } catch (ex) {
            console.error(__filename, ex);
            process.exit(1);
        }
    }

    return connection;
};

module.exports = create_db_connection;
