'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
function handleServeSuccess() {
  this.log.info('handleServeSuccess', 'serve dir ' + this.config.public_dir + ' success');
  this.log.info('handleServeSuccess', 'http://localhost:' + this.config.dev_port);
}

exports['default'] = handleServeSuccess;
module.exports = exports['default'];