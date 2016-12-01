import GitHubProfile from './../../src/modules/github-profile';

describe( 'GitHubProfile', () => {

  let ghProfile;
  beforeEach( () => {
    ghProfile = new GitHubProfile( global.Context );
  } );

  it( 'has a function _getProfile', () => {
    expect( ghProfile ).to.have.a.property( 'getProfile' );
  } );

  it( 'authenticates', () => {
    expect( ghProfile ).to.have.a.property( 'ghClient' ).to.be.an.object;
  } );

  it( 'should fetch the profile data', () => {

    let cfg = {
      affiliation: 'owner',
      per_page: 100
    };
    let filter = {};

    return ghProfile.getProfile( cfg, filter )
      .then( ( res ) => {
        expect( res ).to.be.an.array;
        expect( res ).to.have.lengthOf( 1 );
      } )
      .catch( ( err ) => {
        expect( err ).to.not.exist;
      } );

  } );

  it( 'should fetch the profile data (without filter)', () => {

    let cfg = {
      affiliation: 'owner',
      per_page: 100
    };

    return ghProfile.getProfile( cfg );
  } );

  it( 'should fetch the profile data (without config)', () => {
    return ghProfile.getProfile();
  } );

} );
