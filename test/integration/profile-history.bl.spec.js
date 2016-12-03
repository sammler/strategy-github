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
    //context.dbDisconnect();
  } );

  it( 'save should just save the item', () => {
    let doc = {
      id: 1,
      login: 'stefanwalther',
      foo: 'profile-history',
      lastUpdate: new Date().setUTCHours( 0, 0, 0, 0 )
    };
    return profileHistoryBL.save( doc ).then( result => {
      expect( result ).to.exist;
      expect( result._doc ).to.have.property( 'login' );
      expect( result._doc ).to.have.property( 'lastUpdate' );
    } );
  } );

  it( 'allows to save multiple items per profile', () => {
    expect( false ).to.be.true;
  } );

  it( 'updates and existing item automatically (per profile/day)', () => {
    expect( false ).to.be.true;
  } );

} );
