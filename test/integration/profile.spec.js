import supertest from 'supertest'
import AppServer from './../../src/appServer';

describe( 'profile', () => {

  let server;
  let appServer = new AppServer();
  appServer.dbConnect();
  beforeEach( () => {
    return appServer.start()
      .then( () => {
        server = supertest( appServer.server );
      } )
  } );

  it( 'should ideally succeed', ( done ) => {
    server
      .get( '/profile' )
      .expect( 200 )
      .end( ( err, res ) => {
        expect( err ).to.not.exist;
        expect( res ).to.exist;
        expect( res ).to.be.an.array;
        done();
      } )
  } );

} );
