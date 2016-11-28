//import * as _ from 'lodash';
import * as gh from './gh';
import * as ghUtils from './ghUtils';

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
  _getProfile( options, filter ) {

    this.base.logger.silly( '_getProfile' );

    return new Promise( ( resolve, reject ) => {
      ghUtils.getAll( this.ghClient, 'users.get', options, ( err, res ) => {
        if ( err ) {
          this.base.logger.error( 'err', err );
          return reject( err );
        }
        //this.base.logger.silly( 'res', res );
        return resolve( res );
      } );
    } );

  };

  /**
   * Sync the profile with what have been stored so far.
   */
  sync( options, filter ) {
    this.base.logger.verbose( 'sammler-middleware-github: Sync' );

    return this._getProfile( options, filter )
      .then( ( res ) => {
        this.base.logger.silly( 'Sync profile' );
        this.base.logger.verbose( 'Save profile' );
        this.base.storage.profile.save( res );
      } )
      .catch( this.base.logger.error )

  }

}
