/**
 *      Example from:
 *      https://codeburst.io/node-js-best-practices-smarter-ways-to-manage-config-files-and-variables-893eef56cbef
 *      https://codingsans.com/blog/node-config-best-practices
 *
 *      default-config = development.
 *      All other configs override the development values.
 */

const config =
{
    // development: local development
    development: {
        config_id: "development",
        app_name: "guest registration",
        app_desc: "ase project",
        db_name: "development",
        db_passwd: "postgres",
        db_schema: "public",
        db_port: 5051
    },
    testing: {
        config_id: "testing",
        database: "my-app-db-test"
    },
    staging: {
        config_id: "staging",
        database: "my-app-db-stag"
    },
    production: {
        config_id: "production",
        database: "my-app-db-prod"
    }
};

const default_config = config.development;

// Factory 'create_config' returns the merged result of default-config and wanted-config
const create_config = (config_type=null) => {
    const wanted_config = config[config_type] || {};
    // merge objects: https://stackoverflow.com/a/171256/7421890
    return Object.assign({}, default_config, wanted_config)
}

module.exports = create_config;
