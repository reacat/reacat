var Promise = require('es6-promise').Promise;
var step = require('./step');

function build(options) {
  var context = {
    options: options
  };
  if (options.watch) {
    Promise.resolve()
      .then(step.initLogLevel.bind(context))
      .then(step.getConfig.bind(context))
      .then(step.watchThemePluginAndSource.bind(context))
      .then(step.handleWatch.bind(context))
      .catch(step.handleErrorAndExitProcess.bind(context));
  } else {
    Promise.resolve()
      .then(step.initLogLevel.bind(context))
      .then(step.getConfig.bind(context))
      .then(step.renderOnce.bind(context))
      .catch(step.handleErrorAndExitProcess.bind(context));
  }
}

module.exports = build;
