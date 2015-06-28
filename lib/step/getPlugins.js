'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _utilUncache = require('../util/uncache');

var _utilUncache2 = _interopRequireDefault(_utilUncache);

function getPlugins() {
  var _this = this;

  this.plugins = this.config.plugins.map(function (pluginName) {
    var pluginPath = _path2['default'].resolve(_this.cwd, _this.config.plugin_dir, pluginName);
    var plugin = require(pluginPath);
    (0, _utilUncache2['default'])(pluginPath);
    return plugin;
  });
  this.log.verbose('getPlugins', this.plugins);
}

exports['default'] = getPlugins;
module.exports = exports['default'];