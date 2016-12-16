import ProfileFollowersHistoryBL from './../../src/api/modules/profile-followers-history/profile-followers-history.bl';
import Context from './../../src/api/config/context';
import DBHelpers from './../lib/db-helpers';
import _ from 'lodash';
import Promise from 'bluebird';

describe.only( 'profile-followers-history.bl', () => {

  let dbHelpers;
  let context;

  before( ( done ) => {
    context = Context.instance();
    dbHelpers = new DBHelpers();
    dbHelpers.dropDatabase( done );
  } );

  beforeEach( () => {
    return Promise.all( [
      ProfileFollowersHistoryBL.removeAll()
    ] );
  } );

  it.only( 'has some methods', () => {
    expect( ProfileFollowersHistoryBL ).to.have.a.property( 'ensure' );
    expect( ProfileFollowersHistoryBL ).to.have.a.property( 'removeAll' );
  } );

  it.only( '`removeAll` removes all documents', () => {
    return ProfileFollowersHistoryBL.removeAll()
      .then( ( result ) => {
        expect( result ).to.exist;
        expect( result ).to.have.property( 'message' );
        expect( result ).to.have.property( 'result' );
        expect( result ).to.have.property( 'result' ).to.have.property( 'ok' );
      } );
  } );

  it.only( '`ensure` creates a new entry (with default values)', () => {

    let doc = {
      profile_id: 1,
      user_id: 1
    };

    return ProfileFollowersHistoryBL.ensure( _.clone( doc ) )
      .then( ( result ) => {
        expect( result ).to.exist;
        expect( result ).to.have.property( 'profile_id' );
        expect( result ).to.have.a.property( 'date_from' ).to.exist;
        expect( result ).to.have.a.property( 'date_to' ).to.not.exist;
        expect( result ).to.have.a.property( 'last_check' ).to.exist;
        return ProfileFollowersHistoryBL.countByProfileId( doc.profile_id )
          .then( ( count ) => {
            expect( count ).to.be.equal( 1 );
          } )
      } )
  } );

  it.only( '`save` does not create a new entry for same profile_id, user_id combination (if date_to is null)', () => {

    let doc1 = {
      profile_id: 1,
      user_id: 1,
      date_from: new Date().setUTCHours( 0, 0, 0, 0 )
    };
    let doc2 = {
      profile_id: 1,
      user_id: 1,
      date_from: new Date().setUTCHours( 0, 0, 0, 0 )
    };

    return ProfileFollowersHistoryBL.ensure( _.clone( doc1 ) )
      .then( () => { return Promise.delay( 1000 ) } )
      .then( () => { return ProfileFollowersHistoryBL.ensure( _.clone( doc2 ) ) } )
      .then( ( result ) => {
        expect( result ).to.exist;
        expect( result.date_to ).to.not.exist;
        expect( result ).to.have.property( 's5r_created_at' );
        expect( result ).to.have.property( 's5r_updated_at' );

        // last_check should be larger than the creation date
        expect( result.s5r_created_at.getTime() ).to.be.below( result.s5r_updated_at.getTime() );
      } )
      .then( () => { return ProfileFollowersHistoryBL.count() } )
      .then( ( count ) => {
        expect( count ).to.be.equal( 1 );
      } )
  } );

  it( 'last_check gets updated on update', () => {
    expect( false ).to.be.true;
  } );

  it( '`create` creates a new entry for the same profile_id, user if date_to is not null', () => {
    expect( true ).to.be.false;
  } );

  it( '`create` can also handle multiple entries', () => {
    expect( true ).to.be.false;
  } );

  it( '`removeByProfile` removes only the entries for the profile', () => {
    expect( true ).to.be.false;
  } );

  it( '`getActiveFollowersByProfile` returns the active followers only', () => {

    let profileId = 1;

    return profileFollowersHistoryBL.removeAll()
      .then( () => {return profileFollowersHistoryBL.getActiveFollowersByProfile( profileId )} )
      .then( ( result ) => {
        expect( result ).to.exist.and.to.be.an.array;
        expect( result ).to.have.length( 1 );
      } )
      .catch( ( err ) => {
        expect( err ).to.not.exist;
      } )
  } )

} );
