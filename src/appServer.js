import express from 'express';
import Context from './context';
import * as routes from './routes';
import * as ServiceManagerConfig from './config/service-manager-config';
import ServiceManager from 'simple-service-manager';

//import * as mqListener from './modules/mq-listener';

export default class AppServer {

  constructor( config ) {
    this.PORT = process.env.SAMMLER_MIDDLEWARE_GITHUB_PORT || ( config ? config.port : null ) || 3000;
    this.app = express();
    this._initApp();
    ServiceManagerConfig.init();
    this.logger = ServiceManager.instance().get( 'logger' );

    this.server = null;
    this.context = new Context();
  }

  _initApp() {
    this.app.get( '/*', ( req, res, next ) => {
      console.log( req.path & '\n' );
      next();
    } );
    routes.config( this.app );
  }

  /**
   * Start the Express server
   * @returns {Promise}
   */
  start() {

    return new Promise( ( resolve, reject ) => {
      this.server = this.app.listen( this.PORT, ( err ) => {
        if ( err ) {
          return reject( err );
        }
        this.logger.silly( 'Express server listening on port %d in "%s" mode', this.PORT, this.app.settings.env );
        return resolve();
      } );
    } );

  }

  dbConnect() {
    this.context.dbConnect();
  }

  stop() {
    return new Promise( ( resolve ) => {

      this.context.dbDisconnect();

      this.server.close();
      this.logger.silly( 'Server stopped' );
      resolve();
    } )

  }
}


