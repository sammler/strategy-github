const express = require( 'express' );
const app = express();
const port = 3000;

app.get( '/', ( req, res ) => {
  res.status( 200 ).send( 'Testing and Debugging Sample' );
} )
;
app.get( '/test/:test', function( req, res ) {
  res.status( 200 ).send( req.params.number );
} );

exports.stop = () => {
  server.close();
};

let server = app.listen( port, () => {
  console.log( "Express server listening on port %d in %s mode", port, app.settings.env );
} );
