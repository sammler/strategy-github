const bodyParser = require('body-parser');
const express = require('express');
const Context = require('./config/context');
const routes = require('./routes');

const MqWorker = require('./mq/mq-worker');

class AppServer {

  constructor(config) {
    this.PORT = (config ? config.port : null) || 3000;
    this.app = express();
    this.initApp();

    this.server = null;
    this.context = Context.instance();
    this.logger = this.context.logger;
  }

  initApp() {
    this.app.use(bodyParser.json({limit: '10mb'}));
    this.app.get('/*', (req, res, next) => {
      console.log(`${req.path}\n`);
      next();
    });
    routes.config(this.app);
    this.mqWorker = new MqWorker();
  }

  /**
   * Start the Express server
   * @returns {Promise}
   */
  start() {
    return new Promise((resolve, reject) => {
      this.context.db.get()
        .then(() => {
          this.server = this.app.listen(this.PORT, err => {
            if (err) {
              return reject(err);
            }
            this.logger.info('Express server listening on port %d in "%s" mode', this.PORT, this.app.settings.env);
            return resolve();
          });
        })
        .catch(err => {
          this.context.logger.error('Cannot connect to MongoDB', err);
        });
    });
  }

  stop() {
    return new Promise(resolve => {

      // Todo: disconnect from DB

      this.server.close();
      this.logger.trace('Server stopped');
      resolve();
    });
  }
}

module.exports = AppServer;

