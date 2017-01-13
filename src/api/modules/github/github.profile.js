const ghUtils = require('./github-utils');
const Context = require('./../../config/context');

class GitHubProfile {
  constructor(context) {
    if (!context) {
      context = Context.instance();
    }
    this.ghClient = ghUtils.getGhClient();

    // shortcuts
    this.logger = context.logger;
  }

  /**
   * Get the GitHub profile.
   * @param options
   * @param cb
   * @private
   */
  getProfile(options) {
    this.logger.silly('getProfile');

    return new Promise((resolve, reject) => {
      ghUtils.getAll(this.ghClient, 'users.get', options || {}, (err, res) => {
        if (err) {
          this.logger.error('err', err);
          return reject(err);
        }
        this.logger.info('Got profile', res[0]);
        return resolve(res[0]);
      });
    });
  }
}

module.exports = GitHubProfile;
