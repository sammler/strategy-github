import * as _ from 'lodash';
import * as gh from './gh';
import * as ghUtils from './ghUtils';

/**
 * Handle GitHub repositories.
 */
export default class repos {
  constructor( base ) {
    if ( !base ) {
      throw new Error( 'No base defined' );
    }
    this.base = base;
    this.ghClient = gh.getGhClient();

    // shortcuts
    this.logger = this.base.logger;
  }

  /**
   * Sync all existing repositories.
   *
   * @description
   *
   * The repositories will be filtered as follows:
   * - Forked repositories are ignored.
   *
   * @param {object} queryOptions - Configuration options for repos.getAll (as defined on http://mikedeboer.github.io/node-github/#api-users-getAll & http://mikedeboer.github.io/node-github/#api-repos-getAll)
   * @param {callback} cb - Callback
   * @public
   */
  syncRepos( queryOptions, cb ) {

    var cfg = {
      "affiliation": "owner",
      "per_page": 100
    };

    var filter = {
      forked: false,
      private: false
    };

    cfg = _.extend( cfg, queryOptions || {} );
    this._getRepos( cfg, filter, ( err, res ) => {
      if ( err ) {
        throw err;
      }
      this._saveRepos( res, cb );
    } );
  }

  // *****************************************************************************
  // Internal helper methods
  // *****************************************************************************

  /**
   * Load repositories for the given (current authenticated) user.
   *
   * @param {object} options - The query options.
   * @param {callback} cb - Callback
   * @param {object} filter - Result filter (client side).
   *
   * @private
   */
  _getRepos( options, filter, cb ) {
    ghUtils.getAll( this.ghClient, 'repos.getAll', options, ( err, res ) => {
      res = this._filterRepos( res, filter );
      return cb( err, res );
    } );
  }

  /**
   * Filter repositories
   * @param {Array<repos>} repos - The array of repositories.
   * @param {Object} filter - Filters, such as `private`, `forked`, ...
   * @returns {Array<repos>} repos - Array of filtered repos.
   *
   * @private
   */
  _filterRepos( repos, filter ) {
    this.logger.silly( 'Filter repos', repos, filter );
    return _.filter( repos, filter || {} )
  }

  /**
   * Save repos to storage.
   * @param repos
   * @param cb
   * @private
   */
  _saveRepos( repos, cb ) {
    this.logger.silly( 'Save repos' );
    cb();
  }
}
