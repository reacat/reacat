'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _glob = require('glob');

var _glob2 = _interopRequireDefault(_glob);

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

function getSources() {
  var _this = this;

  var filePaths = _glob2['default'].sync('**', {
    cwd: _path2['default'].resolve(this.cwd, this.config.source_dir),
    nodir: true
  });
  this.sources = filePaths.map(function (filePath) {
    return _path2['default'].resolve(_this.cwd, _this.config.source_dir, filePath);
  }).reduce(function (prev, filePath) {
    prev[filePath] = {
      filePath: filePath,
      fileContent: _fsExtra2['default'].readFileSync(filePath, 'utf8')
    };
    return prev;
  }, {});
  this.log.verbose('getSources', JSON.stringify(this.sources, null, 2));
}

exports['default'] = getSources;
module.exports = exports['default'];