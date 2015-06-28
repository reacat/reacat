'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _ecstatic = require('ecstatic');

var _ecstatic2 = _interopRequireDefault(_ecstatic);

function servePublic() {
  _http2['default'].createServer((0, _ecstatic2['default'])({ root: this.config.public_dir })).listen(this.config.dev_port);
}

exports['default'] = servePublic;
module.exports = exports['default'];