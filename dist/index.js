'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _sammlerStorage = require('sammler-storage');

var _sammlerStorage2 = _interopRequireDefault(_sammlerStorage);

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

var _repos = require('./repos');

var _repos2 = _interopRequireDefault(_repos);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
  function _class() {
    _classCallCheck(this, _class);

    this._db = null;
    this.logger = new _logger2.default();
    this.repos = new _repos2.default(this);
  }

  _createClass(_class, [{
    key: 'db',
    get: function get() {
      if (!this._db) {
        var config = {
          "db": "docker"
        };
        this._db = new _sammlerStorage2.default(config);
      }
      return this._db;
    }
  }]);

  return _class;
}();

exports.default = _class;
//# sourceMappingURL=index.js.map
