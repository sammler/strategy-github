import superagent from 'superagent';

export function init() {
  return new Promise( ( resolve, reject ) => {
    console.log( 'flyway:init\n' );

    superagent
      .get( 'http://localhost9001/health' )
      .end( ( err, res ) => {
        console.log('res', res + '\n');
        resolve();
      } );

  } );
}
