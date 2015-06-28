'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _es6Promise = require('es6-promise');

var _timerStart = require('./timerStart');

var _timerStart2 = _interopRequireDefault(_timerStart);

var _getTheme = require('./getTheme');

var _getTheme2 = _interopRequireDefault(_getTheme);

var _getPlugins = require('./getPlugins');

var _getPlugins2 = _interopRequireDefault(_getPlugins);

var _getSources = require('./getSources');

var _getSources2 = _interopRequireDefault(_getSources);

var _execPlugins = require('./execPlugins');

var _execPlugins2 = _interopRequireDefault(_execPlugins);

var _renderToStaticMarkup = require('./renderToStaticMarkup');

var _renderToStaticMarkup2 = _interopRequireDefault(_renderToStaticMarkup);

var _clearPublicDir = require('./clearPublicDir');

var _clearPublicDir2 = _interopRequireDefault(_clearPublicDir);

var _renderToPublicDir = require('./renderToPublicDir');

var _renderToPublicDir2 = _interopRequireDefault(_renderToPublicDir);

var _timerStop = require('./timerStop');

var _timerStop2 = _interopRequireDefault(_timerStop);

var _handleRenderOnceSuccess = require('./handleRenderOnceSuccess');

var _handleRenderOnceSuccess2 = _interopRequireDefault(_handleRenderOnceSuccess);

function renderOnce() {
  var _this = this;

  return new _es6Promise.Promise(function (resolve, reject) {
    new _es6Promise.Promise(function (resolve_) {
      return resolve_();
    }).then(_timerStart2['default'].bind(_this)).then(_getTheme2['default'].bind(_this)).then(_getPlugins2['default'].bind(_this)).then(_getSources2['default'].bind(_this)).then(_execPlugins2['default'].bind(_this)).then(_renderToStaticMarkup2['default'].bind(_this)).then(_clearPublicDir2['default'].bind(_this)).then(_renderToPublicDir2['default'].bind(_this)).then(_timerStop2['default'].bind(_this)).then(_handleRenderOnceSuccess2['default'].bind(_this)).then(function () {
      return resolve();
    })['catch'](function (err) {
      return reject(err);
    });
  });
}

exports['default'] = renderOnce;
module.exports = exports['default'];