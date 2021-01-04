const {Sequelize} = require('sequelize');

let connection = null;

const create_db_connection = (config) => {
    if(!connection) {
        try {
            connection = new Sequelize(
                config.db_name,
                config.db_user,
                config.db_passwd,
                {dialect: "postgres", logging: true,},
                config,
            );
        } catch (ex) {
            console.error(__filename, ex);
            process.exit(1);
        }
    }

    return connection;
};

module.exports = create_db_connection;
