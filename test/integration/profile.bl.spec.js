import ProfileBL from './../../src/api/modules/profile/profile.bl';
import ProfileHistoryBL from './../../src/api/modules/profile-history/profile-history.bl';
import Context from './../../src/api/config/context';
import DBHelpers from './../lib/db-helpers';
import _ from 'lodash';

describe( 'profile.bl', function() {

  this.timeout(1000);

  let dbHelpers;
  let context;
  before( ( done ) => {
    context = Context.instance();
    dbHelpers = new DBHelpers();
    dbHelpers.dropDatabase( done );
  } );

  beforeEach( () => {
    return Promise.all( [
      ProfileBL.removeAll(),
      ProfileHistoryBL.removeAll()
    ] );
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
    return ProfileBL.save( gitHubProfile )
      .catch( ( err ) => {
        expect( err ).to.exist;
        expect( err ).to.have.property( 'name' ).to.be.equal( 'ValidationError' );
        expect( err.errors.name ).to.deep.include( { path: 'name' } );
      } )
  } );

  it( 'saves the history', () => {

    let dateToday = new Date();
    let dateYesterday = new Date( dateToday.setDate( dateToday.getDate() - 1 ) );
    dateYesterday = dateYesterday.setUTCHours( 0, 0, 0, 0 );

    let doc1 = {
      id: 1,
      login: 'stefanwalther',
      public_repos: 1,
      last_check: dateToday.setUTCHours( 0, 0, 0, 0 )
    };

    let doc2 = {
      id: 1,
      login: 'stefanwalther',
      public_repos: 1,
      last_check: new Date( dateYesterday ).setUTCHours( 0, 0, 0, 0 )
    };

    return ProfileBL.save( _.clone( doc1 ) )
      .then( () => {return ProfileBL.save( _.clone( doc2 ) )} )
      .then( () => {return ProfileHistoryBL.countPerProfileId( doc2.id ) } )
      .then( ( countProfile ) => {
        expect( countProfile ).to.be.equal( 1 );
      } )
      .then( () => {return ProfileBL.countTotal()} )
      .then( ( countHistory ) => {
        expect( countHistory ).to.be.equal( 1 )
      } )

  } );

  it( 'will not save the history in case of `saveOptions.saveHistory` === false', () => {
    let dateToday = new Date();
    let dateYesterday = new Date( dateToday.setDate( dateToday.getDate() - 1 ) );
    dateYesterday = dateYesterday.setUTCHours( 0, 0, 0, 0 );

    let doc1 = {
      id: 1,
      login: 'stefanwalther',
      public_repos: 1,
      last_check: dateToday.setUTCHours( 0, 0, 0, 0 )
    };

    let doc2 = {
      id: 1,
      login: 'stefanwalther',
      public_repos: 1,
      last_check: new Date( dateYesterday ).setUTCHours( 0, 0, 0, 0 )
    };

    return ProfileBL.save( _.clone( doc1 ) )
      .then( () => {return ProfileBL.save( _.clone( doc2 ), { saveHistory: false } )} )
      .then( () => {return ProfileHistoryBL.countPerProfileId( doc2.id ) } )
      .then( ( countProfile ) => {
        expect( countProfile ).to.be.equal( 0 );
      } )
      .then( () => {return ProfileBL.countTotal()} )
      .then( ( countHistory ) => {
        expect( countHistory ).to.be.equal( 1 )
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
    return ProfileBL.save( gitHubProfile )
      .then( ( result ) => {
        expect( result ).to.exist;
        expect( result ).to.have.a.property( 'login' ).to.be.equal( gitHubProfile.login );
        expect( result ).to.have.a.property( 'name' ).to.be.equal( gitHubProfile.name );
        expect( result ).to.not.have.a.property( 'plan' );
        expect( result ).to.not.have.a.property( 'meta' );
      } )
  } );

  it( 'can save a new profile', () => {

    let gitHubProfile = {
      id: 1,
      login: 'stefanwalther',
      foo: 'bar',
      name: 'Stefan Walther'
    };

    return ProfileBL.save( _.clone( gitHubProfile ) )
      .then( ( doc ) => {
        expect( doc ).to.exist;
        expect( doc ).to.be.an.object;
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

    return ProfileBL.save( _.clone( doc1 ) )
      .then( () => { return ProfileBL.save( _.clone( doc2 ) ) } )
      .then( doc => {
        expect( doc ).to.exist;
        expect( doc ).to.have.a.property( 'name' ).to.be.equal( doc2.name );
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
      following: 1,
      name: 'Stefan Walther'
    };

    let doc2 = {
      id: 1,
      login: 'stefanwalther',
      following: 2,
      name: 'Stefan Walther 2',
    };

    return ProfileBL.save( _.clone( doc1 ) )
      .then( () => { return ProfileBL.save( _.clone( doc2 ) ) } )
      .then( () => {

        return ProfileBL.countByLogin( ( 'stefanwalther') )
          .then( ( count ) => {
            expect( count ).to.be.equal( 1 )
          } );
      } )
  } );

  it( 'can only create one entry per profile per day (will just udpate)', () => {

    let doc1 = {
      id: 1,
      login: 'stefanwalther',
      name: 'Stefan Walther',
      last_check: new Date().setUTCHours( 0, 0, 0, 0 )
    };
    let doc2 = {
      id: 1,
      login: 'stefanwalther',
      name: 'Stefan Walther 2',
      last_check: new Date().setUTCHours( 0, 0, 0, 0 )
    };
    return ProfileBL.save( _.clone( doc1 ) )
      .then( () => { return ProfileBL.save( _.clone( doc2 ) ) } )
      .then( ( result2 ) => {
        expect( result2 ).to.exist;
        return ProfileBL.getById( doc2.id )
          .then( ( resultUpdated ) => {
            expect( resultUpdated ).to.exist;
            expect( resultUpdated._doc ).to.have.a.property( 'name' ).to.be.equal( doc2.name );
          } )
      } )
      .then( () => { return ProfileBL.countByLogin( doc1.login )} )
      .then( ( count ) => {
        expect( count ).to.be.equal( 1 );
      } )

  } );

  it( 'allows to create entries for different profiles', () => {

    let doc1 = {
      id: 1,
      login: 'stefanwalther',
      name: 'Stefan Walther',
      last_check: new Date().setUTCHours( 0, 0, 0, 0 )
    };
    let doc2 = {
      id: 2,
      login: 'stefanwalther2',
      name: 'Stefan Walther 2',
      last_check: new Date().setUTCHours( 0, 0, 0, 0 )
    };

    return ProfileBL.save( _.clone( doc1 ) )
      .then( () => { return ProfileBL.save( _.clone( doc2 ) ) } )
      .then( ( results ) => {
        expect( results ).to.exist;
      } )
      .then( () => {
        return ProfileBL.countByLogin( 'stefanwalther' )
          .then( ( count ) => {
            expect( count ).to.be.equal( 1 );
          } )
      } )
      .then( () => {
        return ProfileBL.countTotal()
          .then( ( countTotal ) => {
            expect( countTotal ).to.be.equal( 2 );
          } )
      } )

  } );

} );
