import { Promise } from 'es6-promise';
import step from './step';

function build(options) {
  const context = {
    options
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

export default build;
