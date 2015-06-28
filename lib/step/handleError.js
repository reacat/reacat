'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
function handleError(err) {
  this.log.error('handleError', err.message);
  if (err.stack) {
    this.log.error('handleError', err.stack);
  }
}

exports['default'] = handleError;
module.exports = exports['default'];