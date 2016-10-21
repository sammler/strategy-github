'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _winston = require('winston');

var winston = _interopRequireWildcard(_winston);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var logger = function () {
    function logger() {
        _classCallCheck(this, logger);

        this.winston = new winston.Logger({
            level: 'silly',
            transports: [new winston.transports.Console()]
        });
    }

    _createClass(logger, [{
        key: 'error',
        value: function error(err) {
            this.winston.error(err);
        }
    }, {
        key: 'warn',
        value: function warn(message) {
            this.winston.warn(message);
        }
    }, {
        key: 'info',
        value: function info(message) {
            this.winston.info(message);
        }
    }, {
        key: 'verbose',
        value: function verbose(message) {
            this.winston.verbose(message);
        }
    }, {
        key: 'debug',
        value: function debug(message) {
            this.winston.debug(message);
        }
    }, {
        key: 'silly',
        value: function silly(message) {
            this.winston.silly(message);
        }
    }]);

    return logger;
}();

exports.default = logger;
//# sourceMappingURL=logger.js.map
