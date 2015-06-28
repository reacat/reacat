'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _es6Promise = require('es6-promise');

var _stepInitLogLevel = require('./step/initLogLevel');

var _stepInitLogLevel2 = _interopRequireDefault(_stepInitLogLevel);

var _stepGetConfig = require('./step/getConfig');

var _stepGetConfig2 = _interopRequireDefault(_stepGetConfig);

var _stepWatchThemePluginAndSource = require('./step/watchThemePluginAndSource');

var _stepWatchThemePluginAndSource2 = _interopRequireDefault(_stepWatchThemePluginAndSource);

var _stepHandleWatch = require('./step/handleWatch');

var _stepHandleWatch2 = _interopRequireDefault(_stepHandleWatch);

var _stepRenderOnce = require('./step/renderOnce');

var _stepRenderOnce2 = _interopRequireDefault(_stepRenderOnce);

var _stepHandleErrorAndExitProcess = require('./step/handleErrorAndExitProcess');

var _stepHandleErrorAndExitProcess2 = _interopRequireDefault(_stepHandleErrorAndExitProcess);

function generate(options) {
  var context = { options: options };
  if (options.watch) {
    new _es6Promise.Promise(function (resolve) {
      return resolve();
    }).then(_stepInitLogLevel2['default'].bind(context)).then(_stepGetConfig2['default'].bind(context)).then(_stepWatchThemePluginAndSource2['default'].bind(context)).then(_stepHandleWatch2['default'].bind(context))['catch'](_stepHandleErrorAndExitProcess2['default'].bind(context));
  } else {
    new _es6Promise.Promise(function (resolve) {
      return resolve();
    }).then(_stepInitLogLevel2['default'].bind(context)).then(_stepGetConfig2['default'].bind(context)).then(_stepRenderOnce2['default'].bind(context))['catch'](_stepHandleErrorAndExitProcess2['default'].bind(context));
  }
}

exports['default'] = generate;
module.exports = exports['default'];