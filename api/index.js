const config = require('./config');
const logger = require('./logger');
const ExpressServer = require('./expressServer');

/* USER ADDED - START */
const create_config = require("./core/config");
const core_cnf = create_config();

const { sync_models } = require("./core/repositories/models")
/* USER ADDED - END */

const launchServer = async () => {
  try {
    /* USER ADDED - START */
    sync_models(core_cnf);
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
