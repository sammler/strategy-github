import ProfileFollowersHistoryBL from './../../src/modules/profile-followers-history/profile-followers-history.bl';
import Context from './../../src/config/context';
import DBHelpers from './../lib/db-helpers';


describe( 'profile-followers-history.bl', () => {

  let profileFollowersHistoryBL;
  let dbHelpers;
  let context;
  before( ( done ) => {
    context = Context.instance();
    profileFollowersHistoryBL = new ProfileFollowersHistoryBL();
    dbHelpers = new DBHelpers();
    dbHelpers.dropDatabase( done );
  } );

  it( 'can create an entry', () => {
    expect( true ).to.be.false;
  } );

  it( 'cannot create an entry for the same profile_id, user_id combination (if date_to is null)', () => {
    expect( true ).to.be.false;
  } );

  it( 'can create an entry for the same profile_id, user if date_to is not null', () => {
    expect( true ).to.be.false;
  } )

} );
