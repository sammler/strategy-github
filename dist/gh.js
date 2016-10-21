'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getGhClient = getGhClient;
var gitHubApi = require('github');
var auth = require('./../.github-auth.json');

function getGhClient() {

    //Todo: Use bluebird for promises
    var clientInstance = new gitHubApi();
    clientInstance.authenticate(auth);
    return clientInstance;
}
//# sourceMappingURL=gh.js.map
