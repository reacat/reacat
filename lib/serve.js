'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _step = require('./step');

var _step2 = _interopRequireDefault(_step);

function serve(options) {
  var context = {
    options: options
  };
  Promise.resolve().then(_step2['default'].initLogLevel.bind(context)).then(_step2['default'].getConfig.bind(context)).then(_step2['default'].servePublic.bind(context)).then(_step2['default'].handleServeSuccess.bind(context))['catch'](_step2['default'].handleErrorAndExitProcess.bind(context));
}

exports['default'] = serve;
module.exports = exports['default'];