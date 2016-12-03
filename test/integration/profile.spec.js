import supertest from 'supertest'
import AppServer from './../../src/appServer';
import ProfileBL from './../../src/modules/profile/profile.bl';

describe( 'profile', () => {

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

  it( 'GET /profile => returns all profiles', ( done ) => {
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

  it( 'can save a profile', () => {
    let profileBL = new ProfileBL();
    expect( profileBL ).to.be.an.object;
    profileBL.save( { login: 'stefanwalther' }, ( err, doc ) => {
      expect( err ).to.not.exist;
      expect( err ).to.be.an.object;
      done();
    } );
  } );

  it( 'POST /profile => saves the profile', ( done ) => {
    let profile = {
      login: 'stefanwalther'
    };
    server
      .post( '/profile' )
      .set( 'Accept', 'application/json' )
      .send( profile )
      .expect( 200 )
      .end( ( err, res ) => {
        expect( err ).to.not.exist;
        expect( res ).to.exist;
        expect( res ).to.be.an.object;
        done();
      } )
  } )

} )
;
