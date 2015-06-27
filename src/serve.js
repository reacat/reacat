import http from 'http';
import ecstatic from 'ecstatic';
import log from 'npmlog';
import yaml from 'js-yaml';
import fs from 'fs-extra';
import path from 'path';

function serve(options) {
  let context = {options};
  new Promise(resolve => resolve())
    .then(initLogLevel.bind(context))
    .then(getConfig.bind(context))
    .then(servePublic.bind(context))
    .then(handleSuccess.bind(context))
    .catch(handleError.bind(context));
}

function initLogLevel() {
  if (this.options.verbose) log.level = 'verbose';
}

function getConfig() {
  this.cwd = process.cwd();
  this.config = yaml.safeLoad(fs.readFileSync(path.resolve(this.cwd, '_config.yml'), 'utf8'));
  log.verbose('getConfig', JSON.stringify(this.config, null, 2));
}

function servePublic() {
  http.createServer(
    ecstatic({root: this.config.public_dir})
  ).listen(8765);
}

function handleSuccess() {
  log.info('handleSuccess', 'serve dir ' + this.config.public_dir + ' success!');
  log.info('handleSuccess', 'http://localhost:8765');
}

function handleError(err) {
  log.error('handleError', err.message);
  if (err.stack) {
    log.error('handleError', err.stack);    
  }
  process.exit(1);
}

export default serve;
