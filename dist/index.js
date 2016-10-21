'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sammlerStorage = require('sammler-storage');

var _sammlerStorage2 = _interopRequireDefault(_sammlerStorage);

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

var _repos = require('./repos');

var _repos2 = _interopRequireDefault(_repos);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function _class() {
  _classCallCheck(this, _class);

  this.db = new _sammlerStorage2.default();
  this.logger = new _logger2.default();

  this.repos = new _repos2.default(this);
};

exports.default = _class;
//# sourceMappingURL=index.js.map
