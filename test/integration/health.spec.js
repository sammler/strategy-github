import supertest from 'supertest'
import AppServer from './../../src/appServer';

describe( 'health-check', () => {

  let server;
  let appServer = new AppServer();
  beforeEach( () => {
    return appServer.start()
      .then( () => {
        server = supertest( appServer.server );
      } )
  } );

  afterEach( () => {
    return appServer.stop();
  } );

  it( 'should should return a timestamp', () => {
    return server
      .get( '/health-check' )
      .expect( 200 )
  } );

} );
