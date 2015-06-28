import handleError from './handleError';

function handleErrorAndExitProcess(err) {
  handleError.call(this, err);
  process.exit(1);
}

export default handleErrorAndExitProcess;
