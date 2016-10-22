'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getGhClient = getGhClient;

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GitHubApi = require('github');
var auth = require('./../.github-auth.json');
function getGhClient() {

  var logger = new _logger2.default();

  //Todo: Use bluebird for promises
  var clientInstance = new GitHubApi({
    debug: false
  });
  clientInstance.authenticate(auth);
  return clientInstance;
}
//# sourceMappingURL=gh.js.map
