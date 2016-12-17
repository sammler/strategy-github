// import Context from './../../src/api/config/context';
import GitHubProfile from './../../src/api/modules/github/github.profile';

describe('integration => github-profile => ', () => {
  let ghProfile;
  beforeEach(() => {
    ghProfile = new GitHubProfile(global.Context);
  });

  it('has a function _getProfile', () => {
    expect(ghProfile).to.have.a.property('getProfile');
  });

  it('authenticates', () => {
    expect(ghProfile).to.have.a.property('ghClient').to.be.an.object;
  });

  // Todo: The filter is not implemented, yet
  it('should fetch the profile data', () => {
    const cfg = {
      affiliation: 'owner',
      per_page: 100
    };
    const filter = {};

    return ghProfile.getProfile(cfg, filter)
      .then(res => {
        expect(res).to.not.be.an.array;
        expect(res).to.have.property('name');
        expect(res).to.have.property('login');
        expect(res).to.have.property('created_at').to.exist;
      })
      .catch(err => {
        expect(err).to.not.exist;
      });
  });

  it('should fetch the profile data (without filter)', () => {
    const cfg = {
      affiliation: 'owner',
      per_page: 100
    };

    return ghProfile.getProfile(cfg);
  });

  // Todo: check the result, not sure if this test is really correct.
  it('should fetch the profile data (without config)', () => ghProfile.getProfile());
});
