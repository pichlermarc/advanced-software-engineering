const create_config = require("../../../core/config")
const create_db_connection = require("../../../core/repositories")
const {Sequelize} = require("sequelize")

const cnf = create_config()
const sequelize = create_db_connection(cnf)

const query_maths = "SELECT 2*2 AS \"result\";"

test("should connect to postgres", () => {
    try {
        sequelize.authenticate();
        console.log('Connection has been established successfully.');

        /*sequelize.query(query_maths).then(results => {
            console.log(results);
        }).catch(err => {
            console.error(err);
        });*/

    } catch (error) {
        console.error('Unable to connect to the database:', error);
    } finally {
        sequelize.close()
    }
})