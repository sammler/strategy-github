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
  }

  /**
   * Sync all existing repositories.
   *
   * @description
   *
   * The repositories will be filtered as follows:
   * - Forked repositories are ignored.
   *
   *
   * @param {object} options - Configuration options for repos.getAll (as defined on http://mikedeboer.github.io/node-github/#api-users-getAll & http://mikedeboer.github.io/node-github/#api-repos-getAll)
   * @param {callback} cb - Callback
   * @public
   */


  _createClass(repos, [{
    key: 'syncRepos',
    value: function syncRepos(options, cb) {
      var _this = this;

      var cfg = {
        "affiliation": "owner",
        "per_page": 100
      };

      cfg = _.extend(cfg, options || {});
      this._getRepos(cfg, function (err, res) {
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
     * @param options
     * @param cb
     * @private
     */

  }, {
    key: '_getRepos',
    value: function _getRepos(options, cb) {
      ghUtils.getAll(this.ghClient, 'repos.getAll', options, function (err, res) {
        res = _.filter(res, { fork: false, private: false });
        return cb(err, res);
      });
    }
  }]);

  return repos;
}();

exports.default = repos;
//# sourceMappingURL=repos.js.map
