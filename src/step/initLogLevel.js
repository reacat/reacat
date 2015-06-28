import log from 'npmlog';

function initLogLevel() {
  if (this.options.verbose) log.level = 'verbose';
  this.log = log;
  this.log.verbose('initLogLevel');
}

export default initLogLevel;
