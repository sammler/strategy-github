import * as _ from 'lodash';
import * as gh from './gh';
import * as ghUtils from './ghUtils';

export default class repos {
  constructor( base ) {
    if ( !base ) {
      throw new Error( 'No base defined' );
    }
    this.base = base;
    this.ghClient = gh.getGhClient();

    // shortcuts
    this.db = this.base.db;
  }

  /**
   * Sync all existing repositories.
   *
   * @description
   *
   * The repositories will be filtered as follows:
   * - Forked repositories are ignored.
   *
   *
   * @param {object} options - Configuration options for repos.getAll (as defined on http://mikedeboer.github.io/node-github/#api-users-getAll & http://mikedeboer.github.io/node-github/#api-repos-getAll)
   * @param {callback} cb - Callback
   * @public
   */
  syncRepos( options, cb ) {

    var cfg = {
      "affiliation": "owner",
      "per_page": 100
    };

    cfg = _.extend( cfg, options || {} );
    this._getRepos( cfg, ( err, res ) => {
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
   * @param options
   * @param cb
   * @private
   */
  _getRepos( options, cb ) {
    ghUtils.getAll( this.ghClient, 'repos.getAll', options, ( err, res ) => {
      res = _.filter( res, { fork: false, private: false } );
      return cb( err, res );
    } );
  }
}
