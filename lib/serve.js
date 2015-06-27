'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _ecstatic = require('ecstatic');

var _ecstatic2 = _interopRequireDefault(_ecstatic);

var _npmlog = require('npmlog');

var _npmlog2 = _interopRequireDefault(_npmlog);

var _jsYaml = require('js-yaml');

var _jsYaml2 = _interopRequireDefault(_jsYaml);

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function serve(options) {
  var context = { options: options };
  new Promise(function (resolve) {
    return resolve();
  }).then(initLogLevel.bind(context)).then(getConfig.bind(context)).then(servePublic.bind(context)).then(handleSuccess.bind(context))['catch'](handleError.bind(context));
}

function initLogLevel() {
  if (this.options.verbose) _npmlog2['default'].level = 'verbose';
}

function getConfig() {
  this.cwd = process.cwd();
  this.config = _jsYaml2['default'].safeLoad(_fsExtra2['default'].readFileSync(_path2['default'].resolve(this.cwd, '_config.yml'), 'utf8'));
  _npmlog2['default'].verbose('getConfig', JSON.stringify(this.config, null, 2));
}

function servePublic() {
  _http2['default'].createServer((0, _ecstatic2['default'])({ root: this.config.public_dir })).listen(8765);
}

function handleSuccess() {
  _npmlog2['default'].info('handleSuccess', 'serve dir ' + this.config.public_dir + ' success!');
  _npmlog2['default'].info('handleSuccess', 'http://localhost:8765');
}

function handleError(err) {
  _npmlog2['default'].error('handleError', err.message);
  if (err.stack) {
    _npmlog2['default'].error('handleError', err.stack);
  }
  process.exit(1);
}

exports['default'] = serve;
module.exports = exports['default'];