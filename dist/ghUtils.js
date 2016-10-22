'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAll = getAll;

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

  var logger = new _logger2.default();

  if (!cb || typeof cb !== 'function') {
    throw new Error('No callback defined');
  }

  var items = [];

  var nameSpace = fnName.toString().split('.');
  var resolvedFnName = ghClient;
  if (nameSpace.length > 0) {
    nameSpace.forEach(function (name) {
      resolvedFnName = resolvedFnName[name];
    });
  }
  resolvedFnName(options, fetchResult);

  function fetchResult(err, res) {
    if (err) {
      return done(err);
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
//# sourceMappingURL=ghUtils.js.map
