const gitHubApi = require( 'github' );
const auth = require( './../.github-auth.json' );

export function getGhClient () {

    //Todo: Use bluebird for promises
    let clientInstance = new gitHubApi();
    clientInstance.authenticate( auth );
    return clientInstance;
}
