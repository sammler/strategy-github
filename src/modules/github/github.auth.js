const fs = require( 'fs' );
const path = require( 'path' );

let config = null;

let p = path.join( process.env[ 'HOME' ], '.s5rrc' );
if ( fs.existsSync( p ) ) {
  config = JSON.parse( fs.readFileSync( p, 'utf8' ) );
} else {
  config = {
    'type': 'oauth',
    'token': process.env.S5R_STRATEGY_GITHUB__TOKEN
  }
}

module.exports = config;
