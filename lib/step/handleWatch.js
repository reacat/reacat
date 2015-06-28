'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _es6Promise = require('es6-promise');

var _renderOnce = require('./renderOnce');

var _renderOnce2 = _interopRequireDefault(_renderOnce);

var _handleError = require('./handleError');

var _handleError2 = _interopRequireDefault(_handleError);

function handleWatch() {
  var _this = this;

  return new _es6Promise.Promise(function (resolve, reject) {
    new _es6Promise.Promise(function (resolve) {
      return resolve();
    }).then(_renderOnce2['default'].bind(_this))['catch'](_handleError2['default'].bind(_this));
    _this.watcher.on('change', function () {
      new _es6Promise.Promise(function (resolve) {
        return resolve();
      }).then(_renderOnce2['default'].bind(_this))['catch'](_handleError2['default'].bind(_this));
    });
    _this.watcher.on('error', function (err) {
      return reject(err);
    });
  });
}

exports['default'] = handleWatch;
module.exports = exports['default'];