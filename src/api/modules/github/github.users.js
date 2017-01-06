const ghUtils = require('./github-utils');
const Context = require('./../../config/context');

export default class GithubUsers {
  constructor(context) {
    if (!context) {
      context = Context.instance();
    }
    this.logger = context.logger;
    this.ghClient = ghUtils.getGhClient();
  }

  get() {
    return new Promise((resolve, reject) => {
      ghUtils.getAll(this.ghClient, 'users.get', {}, (err, res) => {
        if (err) {
          this.logger.error('err', err);
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
      ghUtils.getAll(this.ghClient, 'users.getFollowersForUser', username || {}, (err, res) => {
        if (err) {
          this.logger.error('err', err);
          return reject(err);
        }
        this.logger.silly('result', res);
        return resolve(res);
      });
    });
  }
}
