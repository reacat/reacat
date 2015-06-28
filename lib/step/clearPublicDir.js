'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function clearPublicDir() {
  var publicDir = _path2['default'].resolve(this.cwd, this.config.public_dir);
  _fsExtra2['default'].removeSync(publicDir);
  this.log.verbose('clearPublicDir', publicDir);
}

exports['default'] = clearPublicDir;
module.exports = exports['default'];