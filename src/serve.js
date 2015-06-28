import initLogLevel from './step/initLogLevel';
import getConfig from './step/getConfig';
import servePublic from './step/servePublic';
import handleServeSuccess from './step/handleServeSuccess';
import handleErrorAndExitProcess from './step/handleErrorAndExitProcess';

function serve(options) {
  const context = {options};
  new Promise(resolve => resolve())
    .then(initLogLevel.bind(context))
    .then(getConfig.bind(context))
    .then(servePublic.bind(context))
    .then(handleServeSuccess.bind(context))
    .catch(handleErrorAndExitProcess.bind(context));
}

export default serve;
