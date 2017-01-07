const GitHubApi = require('github');
// const auth = require( './../../../.github-auth.json' );
const auth = require('./github.auth');

function getGhClient() {
  // Todo: Use bluebird for promises
  const clientInstance = new GitHubApi({
    debug: false
    // bluebird could be used here
  });
  clientInstance.authenticate(auth);
  return clientInstance;
}

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
function getAll(ghClient, fnName, options, cb) {
  if (!cb || typeof cb !== 'function') {
    throw new Error('No callback defined');
  }

  let items = [];

  const nameSpace = (fnName).toString().split('.');
  let resolvedFnName = ghClient;
  if (nameSpace.length > 0) {
    nameSpace.forEach(name => {
      resolvedFnName = resolvedFnName[name];
    });
  }
  resolvedFnName(options, fetchResult);

  function fetchResult(err, res) {
    if (err) {
      return cb(err);
    }

    items = items.concat(res);
    if (ghClient.hasNextPage(res)) {
      ghClient.getNextPage(res, fetchResult);
    } else {
      returnResult();
    }
  }

  function returnResult() {
    return cb(null, items);
  }
}

module.exports = {
  getGhClient,
  getAll
};
