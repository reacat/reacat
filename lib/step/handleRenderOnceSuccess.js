'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
function handleRenderOnceSuccess() {
  this.log.info('handleRenderOnceSuccess', 'rendered ' + this.timer.count + ' files in ' + this.timer.duration + ' seconds');
  this.log.info('handleRenderOnceSuccess', 'generate success');
}

exports['default'] = handleRenderOnceSuccess;
module.exports = exports['default'];