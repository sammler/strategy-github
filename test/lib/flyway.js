import superagent from 'superagent';

export function init() {
  return new Promise( ( resolve, reject ) => {
    console.log( 'flyway:init\n' );


    //Todo: Implement that
    return resolve(true);

    superagent
      .get( 'http://localhost:9001/health' )
      .end( ( err, res ) => {
        console.log('res', res + '\n');
        resolve();
      } );

  } );
}
