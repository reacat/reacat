'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _handleError = require('./handleError');

var _handleError2 = _interopRequireDefault(_handleError);

function handleErrorAndExitProcess(err) {
  _handleError2['default'].call(this, err);
  process.exit(1);
}

exports['default'] = handleErrorAndExitProcess;
module.exports = exports['default'];