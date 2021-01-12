/**
 *      Example from:
 *      https://codeburst.io/node-js-best-practices-smarter-ways-to-manage-config-files-and-variables-893eef56cbef
 *      https://codingsans.com/blog/node-config-best-practices
 *
 *      default-config = development.
 *      All other configs override the development values.
 *
 *      The keys development, test and production are used in the env-var NODE_ENV
 */

const config =
{
    // development: local development
    development: {
        config_id: "development",
        api_port: 3000,
        db_host_name: "localhost",
        db_name: "development",
        db_user: "ase",
        db_passwd: "ase",
        db_port: 5051,
        db_dialect: "postgres",
        db_logging_sequelize: false,
    },
    test: {
        config_id: "test",
        db_logging_sequelize: true,
    },
    staging: {
        config_id: "staging",
        api_port: 8080,
        db_host_name: "postgres",
        db_port: 5432,
        db_name: "development",
        db_user: "ase",
        db_passwd: "ase",
        db_dialect: "postgres",
        db_logging_sequelize: false,
    },
    production: {
        config_id: "production",
        api_port: 8080,
        db_logging_sequelize: false,
    }
};

const default_config = config.development;

// Factory function 'create_config' returns the merged result of default-config and wanted-config
const create_config = (config_type=null) => {

    // take 'config_type' or env-var or default-config
    const env = config_type || process.env.NODE_ENV || "development";
    //console.log('used env:', env, "; NODE_ENV:", process.env.NODE_ENV);

    // valid config or empty object
    const wanted_config = config[env] || {};

    // merge objects: https://stackoverflow.com/a/171256/7421890
    const merged_config = Object.assign({}, default_config, wanted_config)
    //console.log("config:", JSON.stringify(merged_config));

    return merged_config
}

module.exports = create_config;
