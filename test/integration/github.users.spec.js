const GithubUsers = require('./../../src/api/modules/github/github.users');

describe('integration => github.profile.follwers =>', () => {
  let gitHubUsers;
  // let context;
  before(() => {
    // context = Context.instance();
    gitHubUsers = new GithubUsers();
  });

  it('returns the authenticated user', () => {

    return gitHubUsers
      .get()
      .then(result => {
        expect(result).to.exist;
      });
  });

  it('returns the followers (current authenticated user)', () => {
    const options = {
      username: 'stefanwalther'
    };
    return gitHubUsers
      .getFollowersByUser(options)
      .then(result => {
        expect(result).to.exist;
        expect(result).to.be.an.array;
      })
      .catch(err => {
        expect(err).to.not.exist;
      });
  });

  // Might take longer ... more followers.
  it('returns the followers (anybody else of my people following)', () => {
    const options = {
      username: 'skokenes'
    };
    return gitHubUsers
      .getFollowersByUser(options)
      .then(result => {
        expect(result).to.exist;
        expect(result).to.be.an.array;
      })
      .catch(err => {
        expect(err).to.not.exist;
      });
  });

  it('return the followers (anybody else, not following)', () => {
    const options = {
      username: 'foo'
    };
    return gitHubUsers
      .getFollowersByUser(options)
      .then(result => {
        expect(result).to.exist;
        expect(result).to.be.an.array;
      })
      .catch(err => {
        expect(err).to.not.exist;
      });
  });
});
