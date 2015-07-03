import step from './step';

function serve(options) {
  const context = {
    options
  };
  Promise.resolve()
    .then(step.initLogLevel.bind(context))
    .then(step.getConfig.bind(context))
    .then(step.servePublic.bind(context))
    .then(step.handleServeSuccess.bind(context))
    .catch(step.handleErrorAndExitProcess.bind(context));
}

export default serve;
