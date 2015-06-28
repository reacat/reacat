'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _chokidar = require('chokidar');

var _chokidar2 = _interopRequireDefault(_chokidar);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function watchThemePluginAndSource() {
  this.watcher = _chokidar2['default'].watch([_path2['default'].resolve(this.cwd, this.config.theme_dir), _path2['default'].resolve(this.cwd, this.config.plugin_dir), _path2['default'].resolve(this.cwd, this.config.source_dir)]);
  this.log.verbose('watchThemePluginAndSource', this.watcher);
}

exports['default'] = watchThemePluginAndSource;
module.exports = exports['default'];