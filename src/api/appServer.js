import bodyParser from 'body-parser';
import express from 'express';
import Context from './config/context';
import * as routes from './routes';

// import * as mqListener from './modules/mq-listener';

export default class AppServer {

  constructor(config) {
    this.PORT = process.env.SAMMLER_MIDDLEWARE_GITHUB_PORT || (config ? config.port : null) || 3000;
    this.app = express();
    this.initApp();

    this.server = null;
    this.context = Context.instance();
    this.logger = this.context.logger;
  }

  initApp() {
    this.app.use(bodyParser.json({ limit: '10mb' }));
    this.app.get('/*', (req, res, next) => {
      console.log(`${req.path}\n`);
      next();
    });
    routes.config(this.app);
  }

  /**
   * Start the Express server
   * @returns {Promise}
   */
  start() {
    return new Promise((resolve, reject) => {
      this.server = this.app.listen(this.PORT, (err) => {
        if (err) {
          return reject(err);
        }
        this.logger.silly('Express server listening on port %d in "%s" mode', this.PORT, this.app.settings.env);
        return resolve();
      });
    });
  }

  stop() {
    return new Promise((resolve) => {
      this.context.dbDisconnect();

      this.server.close();
      this.logger.silly('Server stopped');
      resolve();
    });
  }
}

