import Context from './../../src/api/config/context';
import GitHubProfile from './../../src/api/modules/github/github.profile';
import ProfileBL from './../../src/api/modules/profile/profile.bl';
// import ProfileHistoryBL from './../../src/api/modules/profile-history/profile-history.bl';
import * as mUtils from './../../src/api/helper/m-utils';

describe('Sync a profile', () => {
  let context;
  let gitHubProfile;
  // let profileBL;
  // let profileHistoryBL;
  let logger;
  before(() => {
    context = Context.instance();
    gitHubProfile = new GitHubProfile(context);
    logger = context.logger;
  });

  // All to be moved to moved to other areas, just for testing purposes
  it('should sync', () => {
    const cfg = {
      affiliation: 'owner',
      per_page: 100,
    };

    // Todos: for the profile:
    // Todo: Add tests for created timestamps
    // Todo: Use the objectId ?
    // Todo: Use profile_id instead of id
    // Todo: unique index for profile_id & login (two separate indices, not a combined one!)
    // Todo: Move some methods to the Model
    // Todo: Actually mock all responses from GitHub, so that we can run the tests, offline.
    return ProfileBL.removeAll()
      .then(() => gitHubProfile.getProfile(cfg))
      .then((profile) => {
        expect(profile).to.exist;
        delete profile.plan;
        delete profile.meta;
        delete profile[Context.FIELD_CREATED_AT];
        delete profile[Context.FIELD_UPDATED_AT];
        return Promise.resolve(profile);
      })
      .then(profile => ProfileBL.save(profile))
      .then((savedProfile) => {
        expect(savedProfile).to.exist;
        expect(savedProfile).to.contain.property('name');
        expect(savedProfile).to.contain.property('login');
        expect(savedProfile).to.contain.property('public_repos');
        expect(savedProfile).to.not.contain.property('plan');
        expect(savedProfile).to.not.contain.property('meta');

        return Promise.resolve(mUtils.modelToJSON(savedProfile));
      });
    // .then( ( result ) => {
    //  return ProfileHistoryBL.save( result );
    // } )
  });
});
