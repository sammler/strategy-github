const express = require( 'express' );
const app = express();
const port = process.env.SAMMLER_MIDDLEWARE_GITHUB_PORT;
import Logger from 'sammler-nodelib-logger';

let logger = new Logger();

if ( !port ) {
  let msg = 'Port for SAMMLER_MIDDLEWARE_GITHUB_PORT is not set';
  logger.error( msg );
  throw new Error( msg );
}

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
  logger.silly( 'Express server listening on port %d in %s mode', port, app.settings.env );
} );
