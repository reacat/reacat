'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _es6Promise = require('es6-promise');

function execPlugins() {
  var _this = this;

  var p = new _es6Promise.Promise(function (resolve) {
    return resolve();
  });
  this.plugins.forEach(function (plugin) {
    return p.then(plugin.bind(_this));
  });
  return p;
}

exports['default'] = execPlugins;
module.exports = exports['default'];