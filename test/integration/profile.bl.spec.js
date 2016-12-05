import ProfileBL from './../../src/modules/profile/profile.bl';
import Context from './../../src/config/context';
import DBHelpers from './../lib/db-helpers';

describe.only( 'profile.bl', () => {

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
    //context.dbDisconnect();
  } );

  it( 'removeAll removes all existing profiles', () => {
    return profileBL.removeAll();
  } );

  it( 'requires some parameters', () => {
    let doc = {
      id: 1,
      login: 'stefanwalther',
      foo: 'baz'
    };
    return profileBL.save( doc )
      .catch( ( err ) => {
        expect( err ).to.exist;
        expect( err ).to.have.property( 'name' );
      } )
  } );

  it( 'can save a profile', () => {

    let doc = {
      id: 1,
      login: 'stefanwalther',
      foo: 'bar',
      name: 'Stefan Walther'
    };

    return profileBL.save( doc )
      .then( ( doc ) => {
        expect( doc ).to.exist;
        expect( doc ).to.be.an.object;
        expect( doc.id ).to.be.equal( doc.id );
        expect( doc.login ).to.be.equal( doc.login );
        expect( doc.foo ).to.be.equal( doc.foo );

      } )
      .catch( ( err ) => {
        expect( err ).to.not.exist;
        expect( err ).to.be.an.object;
      } );
  } );

  it( 'can update a profile', () => {
    let doc = {
      id: 1,
      login: 'stefanwalther',
      name: 'Stefan Walther',
      foo: 'baz'
    };
    return profileBL.save( doc )
      .then( ( doc ) => {
        expect( doc ).to.exist;
        expect( doc ).to.be.an.object;
        expect( doc.id ).to.be.equal( doc.id );
        expect( doc.login ).to.be.equal( doc.login );
        expect( doc.foo ).to.be.equal( doc.foo );
      } )
      .catch( ( err ) => {
        expect( err ).to.not.exist;
        expect( err ).to.be.an.object;
      } );

  } );

  it( 'can only create one entry per profile per day', () => {
    return profileBL.removeAll()
      .then( () => {

        let doc1 = {
          id: 1,
          login: 'stefanwalther',
          name: 'Stefan Walther',
          foo: 'baz',
          last_check: new Date().setUTCHours( 0, 0, 0, 0 )
        };
        let doc2 = {
          id: 1,
          login: 'stefanwalther',
          name: 'Stefan Walther',
          foo: 'bar',
          last_check: new Date().setUTCHours( 0, 0, 0, 0 )
        };
        return profileBL.save( doc1 )
          .then( () => {
            return profileBL.save( doc2 )
              .then( ( result2 ) => {
                expect( result2 ).to.exist;
                expect( result2._doc ).to.have.property( 'foo' );
                expect( result2._doc.foo ).to.be.equal( doc2.foo );
              } )
              .catch( ( err ) => {
                expect( err ).to.not.exist;
              } )
          } )
          .catch( ( err ) => {
            expect( err ).to.not.exist;
          } );
      } );
  } );

  it( 'allows to create entries on different days for the same profiles', () => {

    return profileBL.removeAll()
      .then( () => {
        let profile1 = {
          id: 1,
          login: 'stefanwalther',
          name: 'Stefan Walther',
          foo: 'baz',
          last_check: new Date().setUTCHours( 0, 0, 0, 0 )
        };
        let profile2 = {
          id: 2,
          login: 'stefanwalther2',
          name: 'Stefan Walther2',
          foo: 'bar',
          last_check: new Date().setUTCHours( 0, 0, 0, 0 )
        };

        return Promise.all( [
          profileBL.save( profile1 ),
          profileBL.save( profile2 )
        ] ).then( ( results ) => {
          expect( results ).to.exist;
        } )
          .catch( ( err ) => {
            expect( err ).to.not.exist;
          } );

      } )
      .catch( ( err ) => {
        expect( err ).to.not.exist;
      } );

  } )

} );
