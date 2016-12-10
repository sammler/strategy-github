import ProfileFollowersHistoryBL from './../../src/modules/profile-followers-history/profile-followers-history.bl';
import Context from './../../src/config/context';
import DBHelpers from './../lib/db-helpers';

xdescribe( 'profile-followers-history.bl', () => {

  let profileFollowersHistoryBL;
  let dbHelpers;
  let context;
  before( ( done ) => {
    context = Context.instance();
    profileFollowersHistoryBL = new ProfileFollowersHistoryBL();
    dbHelpers = new DBHelpers();
    dbHelpers.dropDatabase( done );
  } );

  it( 'has some methods', () => {
    expect( profileFollowersHistoryBL ).to.have.a.property( 'create' );
    expect( profileFollowersHistoryBL ).to.have.a.property( 'removeAll' );
  } );

  it( '`create` creates a new entry (with default values)', () => {

    let entry = {
      profile_id: 1,
      user_id: 1
    };

    return profileFollowersHistoryBL
      .removeAll()
      .then( () => profileFollowersHistoryBL.create( entry ) )
      .then( ( result ) => {
        expect( result ).to.exist;
        expect( result ).to.have.property( 'profile_id' );
        expect( result ).to.have.a.property( 'date_from' ).to.exist;
        expect( result ).to.have.a.property( 'date_to' ).to.not.exist;
      } )
      .catch( ( err ) => {
        expect( err ).to.not.exist;
      } );
  } );

  it( '`create` does not create a new entry for same profile_id, user_id combination (if date_to is null)', () => {
    expect( true ).to.be.false;
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
      .then( () => profileFollowersHistoryBL.getActiveFollowersByProfile( profileId ) )
      .then( ( result ) => {
        expect( result ).to.exist.and.to.be.an.array;
        expect( result ).to.have.length( 1 );
      } )
      .catch( ( err ) => {
        expect( err ).to.not.exist;
      } )
  } )

} );
