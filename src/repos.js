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
    this.db = this.base.db;
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
      res = _.filter( res, filter || {} );
      return cb( err, res );
    } );
  }

  _saveRepos( repos, cb ) {
    this.logger.silly( 'Save repos' );
    cb();
  }
}
