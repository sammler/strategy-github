const ghUtils = require('./github-utils');
const Context = require('./../../config/context');
const logger = require('winster').instance();

class GitHubProfile {
  constructor(context) {
    if (!context) {
      context = Context.instance();
    }
    this.ghClient = ghUtils.getGhClient();

  }

  /**
   * Get the GitHub profile.
   * @param options
   * @param cb
   * @private
   */
  getProfile(options) {
    return new Promise((resolve, reject) => {
      ghUtils.getAll(this.ghClient, 'users.get', options || {}, (err, res) => {
        if (err) {
          logger.error('An error occurred fetching all users.', err);
          return reject(err);
        }
        return resolve(res[0]);
      });
    });
  }
}

module.exports = GitHubProfile;
