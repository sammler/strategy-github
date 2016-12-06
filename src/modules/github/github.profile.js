import * as ghUtils from './github-utils';

//Todo: Rename to just GitHubProfile
export default class GithubProfileFactory {
  constructor( context ) {
    this.ghClient = ghUtils.getGhClient();

    // shortcuts
    this.logger = context.logger;
  }

  /**
   * Get the GitHub profile.
   * @param options
   * @param filter
   * @param cb
   * @private
   */
  getProfile( options, filter ) {

    filter = filter || {};

    this.logger.silly( 'getProfile' );

    return new Promise( ( resolve, reject ) => {
      ghUtils.getAll( this.ghClient, 'users.get', options || {}, ( err, res ) => {
        if ( err ) {
          this.logger.error( 'err', err );
          return reject( err );
        }
        return resolve( res );
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
