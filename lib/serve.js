'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _stepInitLogLevel = require('./step/initLogLevel');

var _stepInitLogLevel2 = _interopRequireDefault(_stepInitLogLevel);

var _stepGetConfig = require('./step/getConfig');

var _stepGetConfig2 = _interopRequireDefault(_stepGetConfig);

var _stepServePublic = require('./step/servePublic');

var _stepServePublic2 = _interopRequireDefault(_stepServePublic);

var _stepHandleServeSuccess = require('./step/handleServeSuccess');

var _stepHandleServeSuccess2 = _interopRequireDefault(_stepHandleServeSuccess);

var _stepHandleErrorAndExitProcess = require('./step/handleErrorAndExitProcess');

var _stepHandleErrorAndExitProcess2 = _interopRequireDefault(_stepHandleErrorAndExitProcess);

function serve(options) {
  var context = { options: options };
  new Promise(function (resolve) {
    return resolve();
  }).then(_stepInitLogLevel2['default'].bind(context)).then(_stepGetConfig2['default'].bind(context)).then(_stepServePublic2['default'].bind(context)).then(_stepHandleServeSuccess2['default'].bind(context))['catch'](_stepHandleErrorAndExitProcess2['default'].bind(context));
}

exports['default'] = serve;
module.exports = exports['default'];