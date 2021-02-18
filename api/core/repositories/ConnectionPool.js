const { Pool } = require('pg');

/*
 *  Factory method 'create_connection_pool' creates a new pool for given config.
 *  If no config is given, it will return 'null'.
 */
const create_connection_pool = config => {
    if (config) {
        return new Pool({
            database: config.db_name,
            user: config.db_user,
            password: config.db_passwd,
            host: config.db_host_name,
            port: config.db_port,
            dialect: config.db_dialect,
        });
    } else return null;
}

module.exports = create_connection_pool;
