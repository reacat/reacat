var step = require('./step');

function serve(options) {
  var context = {
    options: options
  };
  Promise.resolve()
    .then(step.initLogLevel.bind(context))
    .then(step.getConfig.bind(context))
    .then(step.servePublic.bind(context))
    .then(step.handleServeSuccess.bind(context))
    .catch(step.handleErrorAndExitProcess.bind(context));
}

module.exports = serve;
