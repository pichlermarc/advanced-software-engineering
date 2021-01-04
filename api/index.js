const config = require('./config');
const logger = require('./logger');
const ExpressServer = require('./expressServer');

/* USER ADDED - START */
const create_config = require("./core/config");
const core_cnf = create_config();

const { create_models, sync_models, models } = require("./core/repositories/models")

//const models = require("./core/repositories/models")
/* USER ADDED - END */

create_models(core_cnf);

const launchServer = async () => {
  try {
    /* USER ADDED - START */
    sync_models(core_cnf);

    /*(async () => {
      const result = await models.location.findAll({
        raw: true
      });

      console.log('result:', result);
    })();*/

    /*const result = models.location.findAll({
      raw: true
    });
    console.log("result: ", result)*/

    /* USER ADDED - END */
    this.expressServer = new ExpressServer(config.URL_PORT, config.OPENAPI_YAML);
    this.expressServer.launch();
    logger.info('Express server running');
  } catch (error) {
    logger.error('Express Server failure', error.message);
    await this.close();
  }
};

launchServer().catch(e => logger.error(e));
