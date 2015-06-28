'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _npmlog = require('npmlog');

var _npmlog2 = _interopRequireDefault(_npmlog);

function initLogLevel() {
  if (this.options.verbose) _npmlog2['default'].level = 'verbose';
  this.log = _npmlog2['default'];
  this.log.verbose('initLogLevel');
}

exports['default'] = initLogLevel;
module.exports = exports['default'];