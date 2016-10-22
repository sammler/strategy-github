const GitHubApi = require( 'github' );
const auth = require( './../.github-auth.json' );
import Logger from './logger';

export function getGhClient() {

  let logger = new Logger();

  //Todo: Use bluebird for promises
  let clientInstance = new GitHubApi({
    debug: false,
    // bluebird could be used here
  });
  clientInstance.authenticate( auth );
  return clientInstance;
}
