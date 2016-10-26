import Logger from './logger';

/**
 * Get results from all pages
 *
 * @param {object} ghClient - Authenticated GitHub client
 * @param {string} fnName - The function name, e.g. "repos.getAll"
 * @param {object} options - Options for the function tot be called
 * @param {callback} cb - Callback
 *
 * @see https://github.com/mikedeboer/node-github/blob/master/examples/getStarred.js
 */
export function getAll( ghClient, fnName, options, cb ) {

  let logger = new Logger();

  if ( !cb || typeof cb !== 'function' ) {
    throw new Error( 'No callback defined' );
  }

  let items = [];

  let nameSpace = (fnName).toString().split( '.' );
  let resolvedFnName = ghClient;
  if ( nameSpace.length > 0 ) {
    nameSpace.forEach( function( name ) {
      resolvedFnName = resolvedFnName[ name ];
    } );
  }
  resolvedFnName( options, fetchResult );

  function fetchResult( err, res ) {
    if ( err ) {
      return cb( err );
    }

    items = items.concat( res );
    if ( ghClient.hasNextPage( res ) ) {
      ghClient.getNextPage( res, fetchResult );
    } else {
      returnResult();
    }
  }

  function returnResult() {
    return cb( null, items );
  }

}
