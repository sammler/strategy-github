const ghUtils = require('./github-utils');
const Context = require('./../../config/context');
const logger = require('winster').instance();

class GithubUsers {
  constructor(context) {
    if (!context) {
      context = Context.instance();
    }
    this.ghClient = ghUtils.getGhClient();
  }

  get(auth) {
    const ghClient = ghUtils.getGhClient(auth);
    return new Promise((resolve, reject) => {
      ghUtils.getAll(ghClient, 'users.get', {}, (err, res) => {
        if (err) {
          logger.error('err', err);
          return reject(err);
        }
        return resolve(res);
      });
    });
  }

  /**
   * List a user's followers
   * @param username
   * @see http://mikedeboer.github.io/node-github/#api-users-getFollowersForUser
   */
  getFollowersByUser(username) {
    // Todo: Promisify this ugly stuff
    return new Promise((resolve, reject) => {
      ghUtils.getAll(ghUtils.getGhClient(), 'users.getFollowersForUser', username || {}, (err, res) => {
        if (err) {
          logger.error('err', err);
          return reject(err);
        }
        logger.trace('result', res);
        return resolve(res);
      });
    });
  }
}

module.exports = GithubUsers;
