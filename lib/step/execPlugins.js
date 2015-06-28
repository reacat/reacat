'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _es6Promise = require('es6-promise');

function execPlugins() {
  var _this = this;

  return _es6Promise.Promise.all(this.plugins.map(function (plugin) {
    return plugin.call(_this);
  }));
}

exports['default'] = execPlugins;
module.exports = exports['default'];