const express = require( 'express' );
const app = express();
const port = process.env.SAMMLER_MIDDLEWARE_GITHUB_PORT || 3000;
import Logger from 'sammler-nodelib-logger';
import * as mqListener from './modules/mq-listener';

let logger = new Logger();

app.get( '/', ( req, res ) => {
  res.status( 200 ).send( 'Testing and Debugging Sample' );
} )
;
app.get( '/test/:test', ( req, res ) => {
  res.status( 200 ).send( req.params.number );
} );

exports.stop = () => {
  server.close();
};

let server = app.listen( port, () => {
  if ( !port ) {
    let msg = 'Port for SAMMLER_MIDDLEWARE_GITHUB_PORT is not set';
    logger.error( msg );
    throw new Error( msg );
  }

  logger.silly( 'Express server listening on port %d in %s mode', port, app.settings.env );
  mqListener.listen();
} );
