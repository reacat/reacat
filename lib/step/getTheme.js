'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _utilUncache = require('../util/uncache');

var _utilUncache2 = _interopRequireDefault(_utilUncache);

function getTheme() {
  var themePath = _path2['default'].resolve(this.cwd, this.config.theme_dir, this.config.theme);
  this.theme = require(themePath);
  // node will always cache the required module, so we should uncache it and it's children modules.
  (0, _utilUncache2['default'])(themePath);
  this.log.verbose('getTheme', this.theme);
}

exports['default'] = getTheme;
module.exports = exports['default'];