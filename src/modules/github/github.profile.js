import * as ghUtils from './github-utils';

export default class GitHubProfile {
  constructor( context ) {
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
  getProfile( options ) {

    this.logger.silly( 'getProfile' );

    return new Promise( ( resolve, reject ) => {
      ghUtils.getAll( this.ghClient, 'users.get', options || {}, ( err, res ) => {
        if ( err ) {
          this.logger.error( 'err', err );
          return reject( err );
        }
        return resolve( res[ 0 ] );
      } );
    } );

  }

  /**
   * Sync the profile with what have been stored so far.
   */
  //sync( options, filter ) {
  //  this.logger.verbose( 'sammler-middleware-github: Sync' );
  //
  //  return this.getProfile( options, filter )
  //    .then( ( res ) => {
  //      this.logger.silly( 'Sync profile' );
  //      this.logger.verbose( 'Save profile' );
  //      //this.storage.profile.save( res );
  //    } )
  //    .catch( this.logger.error )
  //}
}
