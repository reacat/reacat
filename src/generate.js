import {Promise} from 'es6-promise';
import initLogLevel from './step/initLogLevel';
import getConfig from './step/getConfig';
import watchThemePluginAndSource from './step/watchThemePluginAndSource';
import handleWatch from './step/handleWatch';
import renderOnce from './step/renderOnce';
import handleErrorAndExitProcess from './step/handleErrorAndExitProcess';

function generate(options) {
  const context = {options};
  if (options.watch) {
    new Promise(resolve => resolve())
      .then(initLogLevel.bind(context))
      .then(getConfig.bind(context))
      .then(watchThemePluginAndSource.bind(context))
      .then(handleWatch.bind(context))
      .catch(handleErrorAndExitProcess.bind(context));
  } else {
    new Promise(resolve => resolve())
      .then(initLogLevel.bind(context))
      .then(getConfig.bind(context))
      .then(renderOnce.bind(context))
      .catch(handleErrorAndExitProcess.bind(context));
  }
}

export default generate;
