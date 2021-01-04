const {Sequelize} = require('sequelize');

let connection = null;

const db_connect = (config) => {
    if(!connection) {
        try {
            connection = new Sequelize(
                config.db_name,
                config.db_user,
                config.db_passwd,
                {dialect: "postgres"},
                config,
            );
        } catch (ex) {
            console.error(__filename, ex);
            process.exit(1);
        }
    }

    return connection;
};

module.exports = db_connect;
