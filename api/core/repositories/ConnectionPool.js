const { Pool } = require('pg');


/*
 *  Factory method 'create_connection_pool' creates a new pool for given config.
 *  If no config is given, it will return 'null'.
 */
const create_connection_pool = config => {
    if(config === undefined || config == null) {
        return null;
    }

    return new Pool({
        host: config.host_name,
        user: config.db_user,
        password: config.db_passwd,
        database: config.db_name,
        port: config.db_port
    });
}

module.exports = create_connection_pool;