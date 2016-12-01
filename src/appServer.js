const express = require( 'express' );
const app = express();
const port = process.env.SAMMLER_MIDDLEWARE_GITHUB_PORT || 3000;

import Base from './base';
import * as mqListener from './modules/mq-listener';

export default class AppServer {
  constructor() {
    this.server = null;
    this.base = new Base();
    this._init();
  }

  _init() {

  }

  start() {
    this.server = app.listen( port, () => {
      if ( !port ) {
        let msg = 'Port for SAMMLER_MIDDLEWARE_GITHUB_PORT is not set';
        this.base.logger.error( msg );
        throw new Error( msg );
      }

      this.base.logger.silly( 'Express server listening on port %d in %s mode', port, app.settings.env );



    } );
  }

  stop() {
    this.server.close();
    this.base.logger.silly( 'Server stopped' );
  }
}


