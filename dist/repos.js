'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash');

var _ = _interopRequireWildcard(_lodash);

var _gh = require('./gh');

var gh = _interopRequireWildcard(_gh);

var _ghUtils = require('./ghUtils');

var ghUtils = _interopRequireWildcard(_ghUtils);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Handle GitHub repositories.
 */
var repos = function () {
  function repos(base) {
    _classCallCheck(this, repos);

    if (!base) {
      throw new Error('No base defined');
    }
    this.base = base;
    this.ghClient = gh.getGhClient();

    // shortcuts
    this.db = this.base.db;
    this.logger = this.base.logger;
  }

  /**
   * Sync all existing repositories.
   *
   * @description
   *
   * The repositories will be filtered as follows:
   * - Forked repositories are ignored.
   *
   * @param {object} queryOptions - Configuration options for repos.getAll (as defined on http://mikedeboer.github.io/node-github/#api-users-getAll & http://mikedeboer.github.io/node-github/#api-repos-getAll)
   * @param {callback} cb - Callback
   * @public
   */


  _createClass(repos, [{
    key: 'syncRepos',
    value: function syncRepos(queryOptions, cb) {
      var _this = this;

      var cfg = {
        "affiliation": "owner",
        "per_page": 100
      };

      var filter = {
        forked: false,
        private: false
      };

      cfg = _.extend(cfg, queryOptions || {});
      this._getRepos(cfg, filter, function (err, res) {
        if (err) {
          throw err;
        }
        _this._saveRepos(res, cb);
      });
    }

    // *****************************************************************************
    // Internal helper methods
    // *****************************************************************************

    /**
     * Load repositories for the given (current authenticated) user.
     *
     * @param {object} options - The query options.
     * @param {callback} cb - Callback
     * @param {object} filter - Result filter (client side).
     *
     * @private
     */

  }, {
    key: '_getRepos',
    value: function _getRepos(options, filter, cb) {
      ghUtils.getAll(this.ghClient, 'repos.getAll', options, function (err, res) {
        res = _.filter(res, filter || {});
        return cb(err, res);
      });
    }
  }, {
    key: '_saveRepos',
    value: function _saveRepos(repos, cb) {
      this.logger.silly('Save repos');
      cb();
    }
  }]);

  return repos;
}();

exports.default = repos;
//# sourceMappingURL=repos.js.map
