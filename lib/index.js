'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _build = require('./build');

var _build2 = _interopRequireDefault(_build);

var _serve = require('./serve');

var _serve2 = _interopRequireDefault(_serve);

exports['default'] = { build: _build2['default'], serve: _serve2['default'] };
module.exports = exports['default'];