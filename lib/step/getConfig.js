'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _jsYaml = require('js-yaml');

var _jsYaml2 = _interopRequireDefault(_jsYaml);

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var _defaultConfig = require('../defaultConfig');

var _defaultConfig2 = _interopRequireDefault(_defaultConfig);

function getConfig() {
  this.cwd = process.cwd();
  this.config = (0, _objectAssign2['default'])({}, _defaultConfig2['default'], _jsYaml2['default'].safeLoad(_fsExtra2['default'].readFileSync(_path2['default'].resolve(this.cwd, 'config.yml'), 'utf8')));
  this.log.verbose('getConfig', JSON.stringify(this.config, null, 2));
}

exports['default'] = getConfig;
module.exports = exports['default'];