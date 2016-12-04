import GithubUsers from './../../src/modules/github/github.users';
import Context from './../../src/config/context';

describe( 'github.profile.follwers', () => {

  let gitHubUsers;
  let context;
  before( () => {
    context = Context.instance();
    gitHubUsers = new GithubUsers();
  } );

  xit( 'returns the authenticated user', () => {
    return gitHubUsers
      .get()
      .then( ( result ) => {
        expect( result ).to.exist;
      } )
  } );

  it( 'returns the followers (current authenticated user)', () => {

    let options = {
      username: 'stefanwalther'
    };
    return gitHubUsers
      .getFollowersByUser( options )
      .then( ( result ) => {
        expect( result ).to.exist;
        expect( result ).to.be.an.array;
      } )
      .catch( ( err ) => {
        expect( err ).to.not.exist;
      } )

  } );

  // Might take longer ... more followers.
  it( 'returns the followers (anybody else of my people following)', () => {
    let options = {
      username: 'skokenes'
    };
    return gitHubUsers
      .getFollowersByUser( options )
      .then( ( result ) => {
        expect( result ).to.exist;
        expect( result ).to.be.an.array;
      } )
      .catch( ( err ) => {
        expect( err ).to.not.exist;
      } )

  } );

  it( 'return the followers (anybody else, not following)', () => {
    let options = {
      username: 'foo'
    };
    return gitHubUsers
      .getFollowersByUser( options )
      .then( ( result ) => {
        expect( result ).to.exist;
        expect( result ).to.be.an.array;
      } )
      .catch( ( err ) => {
        expect( err ).to.not.exist;
      } )

  } );
} );
