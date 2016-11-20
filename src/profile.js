import * as _ from 'lodash';
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

  _getProfile( options, filter, cb ) {
    ghUtils.getAll( this.ghClient, 'users.get', options, ( err, res ) => {
      console.log( JSON.stringify( res ) );
      return cb( err, res );
    } )
  }

}
