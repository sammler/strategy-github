import ProfileBL from './../../src/modules/profile/profile.bl';
import Context from './../../src/config/context';
import DBHelpers from './../lib/db-helpers';
import _ from 'lodash';

describe( 'profile.bl', () => {

  let profileBL;
  let dbHelpers;
  let context;
  before( ( done ) => {
    context = Context.instance();
    profileBL = new ProfileBL( context );
    dbHelpers = new DBHelpers();
    dbHelpers.dropDatabase( done );
  } );
  beforeEach( () => {

  } );
  after( () => {
    // Do not disconnect, otherwise the other tests will fail ...
    //context.dbDisconnect();
  } );

  it( 'removeAll removes all existing profiles', () => {
    return ProfileBL.removeAll();
  } );

  it( 'throws an error if parameters are missing', () => {
    let gitHubProfile = {
      id: 1,
      login: 'stefanwalther',
      foo: 'baz'
    };
    return profileBL.save( gitHubProfile )
      .catch( ( err ) => {
        expect( err ).to.exist;
        expect( err ).to.have.property( 'name' ).to.be.equal( 'ValidationError' );
        expect( err.errors.name ).to.deep.include( { path: 'name' } );
      } )
  } );

  it( 'will remove unnecessary objects', () => {
    let gitHubProfile = {
      id: 1,
      login: 'stefanwalther',
      foo: 'bar',
      name: 'Stefan Walther',
      plan: {
        name: 'personal'
      },
      meta: {
        'x-ratelimit-limit': '5000'
      }
    };
    return profileBL.save( gitHubProfile )
      .then( ( result ) => {
        expect( result._doc ).to.not.have.a.property( 'plan' );
        expect( result._doc ).to.not.have.a.property( 'meta' );
      } )
      .catch( ( err ) => {
        expect( err ).to.not.exist;
      } );
  } );

  it( 'can save a new profile', () => {

    let gitHubProfile = {
      id: 1,
      login: 'stefanwalther',
      foo: 'bar',
      name: 'Stefan Walther'
    };

    return ProfileBL.removeAll()
      .then( () => profileBL.save( _.clone( gitHubProfile ) ) )
      .then( ( doc ) => {
        expect( doc ).to.exist;
        expect( doc ).to.be.an.object;
        expect( doc ).to.not.have.property( 'id' ); // should be removed
        expect( doc._doc ).to.not.have.property( 'id' ); // should be removed
        expect( doc.login ).to.be.equal( gitHubProfile.login );
        expect( doc ).to.have.property( 's5r_created_at' ).to.exist;
        expect( doc ).to.have.property( 's5r_updated_at' ).to.not.exist;
        expect( doc ).to.have.property( 'last_check' ).to.exist;
      } )
      .then( () => {
        return ProfileBL.getById( 1 )
          .then( ( result ) => {
            expect( result ).to.exist;
            expect( result ).to.have.a.property( 'login' ).to.be.equal( gitHubProfile.login );
            expect( result._doc ).to.have.a.property( 'foo' ).to.be.equal( gitHubProfile.foo );
          } )
      } )
  } );

  it( 'can update a profile', () => {

    let doc1 = {
      id: 1,
      login: 'stefanwalther',
      name: 'Stefan Walther'
    };

    let doc2 = {
      id: 1,
      login: 'stefanwalther',
      name: 'Stefan Walther 2'
    };
    return ProfileBL.removeAll()
      .then( () => profileBL.save( _.clone( doc1 ), { saveHistory: true } ) )
      .then( () => profileBL.save( _.clone( doc2 ), { saveHistory: true } ) )
      .then( ( doc ) => {
        expect( doc ).to.exist;
        expect( doc ).to.be.an.object;
        expect( doc ).to.have.a.property( 'nModified' ).to.be.equal( 1 );
        return ProfileBL.getById( doc2.id )
          .then( ( updatedDoc ) => {
            expect( updatedDoc ).to.exist;
            expect( updatedDoc ).to.have.a.property( 'name' ).to.be.equal( doc2.name )
          } )
      } )
  } );

  it( 'will save the history, if the profile was updated', () => {
    let doc1 = {
      id: 1,
      login: 'stefanwalther',
      foo: 'bar',
      name: 'Stefan Walther'
    };

    let doc2 = {
      id: 1,
      login: 'stefanwalther',
      name: 'Stefan Walther',
      foo: 'baz'
    };

  } );

  it( 'can only create one entry per profile per day', () => {
    return ProfileBL.removeAll()
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
        return profileBL.save( _.clone( doc1 ) )
          .then( () => {
            return profileBL.save( _.clone( doc2 ) )
              .then( ( result2 ) => {
                expect( result2 ).to.exist;
                expect( result2 ).to.have.a.property( 'nModified' ).to.be.equal( 1 );
                return ProfileBL.getById( doc2.id )
                  .then( ( resultUpdated ) => {
                    expect( resultUpdated ).to.exist;
                    expect( resultUpdated._doc ).to.have.a.property( 'foo' ).to.be.equal( doc2.foo );
                  } )
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

    return ProfileBL.removeAll()
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
