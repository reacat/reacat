'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

function renderToPublicDir() {
  var _this = this;

  var publicDir = _path2['default'].resolve(this.cwd, this.config.public_dir);
  var count = 0;
  Object.keys(this.sources).forEach(function (filePath) {
    var source = _this.sources[filePath];
    if (!source.render) return;
    var whitePath = _path2['default'].resolve(publicDir, source.page.permalink.replace(/^\//, ''));
    _fsExtra2['default'].mkdirsSync(_path2['default'].dirname(whitePath));
    _fsExtra2['default'].writeFileSync(whitePath, source.renderContent, {
      encoding: 'utf8'
    });
    count += 1;
  });
  this.timer.count = count;
  this.log.verbose('renderToPublicDir', publicDir);
}

exports['default'] = renderToPublicDir;
module.exports = exports['default'];