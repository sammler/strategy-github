//import * as _ from 'lodash';
import * as gh from './gh';
import * as ghUtils from './ghUtils';
//import * as dbProfile from './storage/profile';

export default class Profile {
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
   * Get the GitHub profile.
   * @param options
   * @param filter
   * @param cb
   * @private
   */
  _getProfile( options, filter, cb ) {
    ghUtils.getAll( this.ghClient, 'users.get', options, ( err, res ) => {
      this.logger.silly( res );

      return cb( err, res );
    } )
  }

  /**
   * Sync the profile with what have been stored so far.
   */
  sync() {
    this.base.logger.silly( 'Just sync' );
  }

}
