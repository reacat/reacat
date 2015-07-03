'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _es6Promise = require('es6-promise');

var _step = require('./step');

var _step2 = _interopRequireDefault(_step);

function build(options) {
  var context = {
    options: options
  };
  if (options.watch) {
    _es6Promise.Promise.resolve().then(_step2['default'].initLogLevel.bind(context)).then(_step2['default'].getConfig.bind(context)).then(_step2['default'].watchThemePluginAndSource.bind(context)).then(_step2['default'].handleWatch.bind(context))['catch'](_step2['default'].handleErrorAndExitProcess.bind(context));
  } else {
    _es6Promise.Promise.resolve().then(_step2['default'].initLogLevel.bind(context)).then(_step2['default'].getConfig.bind(context)).then(_step2['default'].renderOnce.bind(context))['catch'](_step2['default'].handleErrorAndExitProcess.bind(context));
  }
}

exports['default'] = build;
module.exports = exports['default'];