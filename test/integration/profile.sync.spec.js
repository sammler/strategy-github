import Context from './../../src/config/context';
import GitHubProfile from './../../src/modules/github/github.profile';
import ProfileBL from './../../src/modules/profile/profile.bl';
import ProfileHistoryBL from './../../src/modules/profile-history/profile-history.bl';
import * as mUtils from './../../src/helper/m-utils';

describe.only( 'Sync a profile', () => {

  let context;
  let gitHubProfile;
  let profileBL;
  let profileHistoryBL;
  let logger;
  before( () => {
    context = Context.instance();
    gitHubProfile = new GitHubProfile( context );
    profileBL = new ProfileBL( context );
    profileHistoryBL = new ProfileHistoryBL( context );
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
        delete profile.plan;
        delete profile.meta;
        return Promise.resolve( profile );
      } )
      .then( ( profile ) => { return profileBL.save( profile ) } )
      .then( ( savedProfile ) => {
        expect( savedProfile ).to.exist;
        expect( savedProfile ).to.contain.property( 'name' );
        expect( savedProfile ).to.contain.property( 'login' );
        expect( savedProfile ).to.contain.property( 'public_repos' );
        expect( savedProfile ).to.not.contain.property( 'plan' );
        expect( savedProfile ).to.not.contain.property( 'meta' );

        return Promise.resolve( mUtils.modelToJSON( savedProfile) );
      } )
      .then( ( result ) => {
        return profileHistoryBL.save( result );
      } )
      .catch( ( err ) => {
        expect( err ).to.not.exist;
      } )
  } );
} );
