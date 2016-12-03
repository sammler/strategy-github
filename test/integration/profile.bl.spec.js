import ProfileBL from './../../src/modules/profile/profile.bl';
import Context from './../../src/config/context';
import DBHelpers from './../lib/db-helpers';

describe( 'profile.bl', () => {

  let profileBL;
  let dbHelpers;
  let context;
  before( ( done ) => {
    context = Context.instance();
    profileBL = new ProfileBL();
    dbHelpers = new DBHelpers();
    dbHelpers.dropDatabase( done );
  } );
  beforeEach( () => {

  } );
  after( () => {
    context.dbDisconnect();
  } );

  it( 'removeAll removes all existing profiles', () => {
    return profileBL.removeAllP();
  } );

  it( 'requires some parameters', ( done ) => {
    let doc = {
      id: 1,
      login: 'stefanwalther',
      foo: 'baz'
    };
    profileBL.save( doc, ( err, doc ) => {
      expect( err ).to.exist;
      expect( err ).to.have.property( 'name' );
      done();
    } );
  } );

  it( 'can save a profile', ( done ) => {

    let doc = {
      id: 1,
      login: 'stefanwalther',
      foo: 'bar',
      name: 'Stefan Walther'
    };

    profileBL.save( doc, ( err, doc ) => {
      expect( err ).to.not.exist;
      expect( err ).to.be.an.object;
      expect( doc ).to.exist;
      expect( doc ).to.be.an.object;
      expect( doc.id ).to.be.equal( doc.id );
      expect( doc.login ).to.be.equal( doc.login );
      expect( doc.foo ).to.be.equal( doc.foo );
      done();
    } );
  } );

  it( 'can update a profile', ( done ) => {
    let doc = {
      id: 1,
      login: 'stefanwalther',
      name: 'Stefan Walther',
      foo: 'baz'
    };
    profileBL.save( doc, ( err, doc ) => {
      expect( err ).to.not.exist;
      expect( err ).to.be.an.object;
      expect( doc ).to.exist;
      expect( doc ).to.be.an.object;
      expect( doc.id ).to.be.equal( doc.id );
      expect( doc.login ).to.be.equal( doc.login );
      expect( doc.foo ).to.be.equal( doc.foo );
      done();
    } );

  } );

  it( 'can only create one entry per profile per day', ( done ) => {
    profileBL.removeAll( ( err ) => {
      expect( err ).to.not.exist;

      let doc1 = {
        id: 1,
        login: 'stefanwalther',
        name: 'Stefan Walther',
        foo: 'baz',
        lastUpdate: new Date().setUTCHours( 0, 0, 0, 0 )
      };
      let doc2 = {
        id: 1,
        login: 'stefanwalther',
        name: 'Stefan Walther',
        foo: 'bar',
        lastUpdate: new Date().setUTCHours( 0, 0, 0, 0 )
      };

      profileBL.save( doc1, ( err, result ) => {
        expect( err ).to.not.exist;
        profileBL.save( doc2, ( err, result2 ) => {
          expect( err ).to.not.exist;
          expect( result2 ).to.exist;
          expect( result2._doc ).to.have.property( 'foo' );
          expect( result2._doc.foo ).to.be.equal( doc2.foo );
          done();
        } )
      } );

    } )
  } );

  it( 'allows to create entries on different days for the same profiles', ( done ) => {

    profileBL.removeAll( ( err ) => {
      expect( err ).to.not.exist;

      let profile1 = {
        id: 1,
        login: 'stefanwalther',
        name: 'Stefan Walther',
        foo: 'baz',
        lastUpdate: new Date().setUTCHours( 0, 0, 0, 0 )
      };
      let profile2 = {
        id: 2,
        login: 'stefanwalther2',
        name: 'Stefan Walther2',
        foo: 'bar',
        lastUpdate: new Date().setUTCHours( 0, 0, 0, 0 )
      };

      Promise.all( [
        profileBL.saveP( profile1 ),
        profileBL.saveP( profile2 )
      ] ).then( ( results ) => {
        expect( results ).to.exist;
        done();
      } )
        .catch( ( err ) => {
          expect( err ).to.not.exist;
        } );

    } )

  } );

} );
