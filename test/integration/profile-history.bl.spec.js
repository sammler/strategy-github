import ProfileHistoryBL from './../../src/modules/profile-history/profile-history.bl';
import Context from './../../src/config/context';
import DBHelpers from './../lib/db-helpers';

describe.only( 'profile-history.bl', () => {

  let profileHistoryBL;
  let dbHelpers;
  let context;
  before( ( done ) => {
    context = Context.instance();
    profileHistoryBL = new ProfileHistoryBL();
    dbHelpers = new DBHelpers();
    dbHelpers.dropDatabase( done );
  } );
  beforeEach( () => {

  } );
  after( () => {
    context.dbDisconnect();
  } );

  it( 'should ideally succeed', () => {
    expect( true ).to.be.true;
  } );

} );
