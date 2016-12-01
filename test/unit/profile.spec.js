let Profile = require( './../../src/modules/profile/profile.model' ).Model;

describe( 'unit:Profile ==>', () => {

  let ProfileMock;
  beforeEach( () => {
    ProfileMock = sinon.mock( Profile );
  } );
  afterEach( () => {
    ProfileMock.restore();
  } );

  it( 'should return all profiles', ( done ) => {
    let expectedResult = { status: true, data: [] };
    ProfileMock.expects( 'find' ).yields( null, expectedResult );
    Profile.find( ( err, result ) => {
      ProfileMock.verify();
      expect( result.status ).to.be.true;
      done();
    } );
  } );

  it( 'should return an error', ( done ) => {
    let expectedResult = { status: false, error: 'Something went wrong' };
    ProfileMock.expects( 'find' ).yields( expectedResult, null );
    Profile.find( ( err, result ) => {
      ProfileMock.verify();
      expect( err.status ).to.not.be.true;
      done();
    } );
  } );

} );