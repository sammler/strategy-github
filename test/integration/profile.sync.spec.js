import Context from './../../src/config/context';
import GitHubProfile from './../../src/modules/github/github.profile';
import ProfileBL from './../../src/modules/profile/profile.bl';

describe.only( 'Sync a profile', () => {

  let context;
  let gitHubProfile;
  let profileBL;
  let logger;
  before( () => {
    context = Context.instance();
    gitHubProfile = new GitHubProfile( context );
    profileBL = new ProfileBL( context );
    logger = context.logger;
  } );

  // All to be moved to moved to other areas, just for testing purposes
  it( 'should sync', () => {

    let cfg = {
      affiliation: 'owner',
      per_page: 100
    };

    return profileBL.removeAll()
      .then( () => { return gitHubProfile.getProfile( cfg ) } )
      .then( ( profile ) => {
        expect( profile ).to.exist;
        return Promise.resolve( profile );
      } )
      .then( ( profile ) => { return profileBL.save( profile ) } )
      .then( () => {
        return Promise.resolve();
      } )
      .catch( ( err ) => {
        expect( err ).to.not.exist;
      } )
  } );
} );
