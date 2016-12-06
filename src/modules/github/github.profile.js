import * as ghUtils from './github-utils';

export default class GitHubProfile {
  constructor( context ) {
    if ( !context ) {
      throw new Error( 'No context provided.' );
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
  getProfile( options ) {

    this.logger.silly( 'getProfile' );

    return new Promise( ( resolve, reject ) => {
      ghUtils.getAll( this.ghClient, 'users.get', options || {}, ( err, res ) => {
        if ( err ) {
          //this.logger.error( 'err', err );
          return reject( err );
        }
        return resolve( res[ 0 ] );
      } );
    } );

  }
}
