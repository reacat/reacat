function handleRenderOnceSuccess() {
  this.log.info('handleRenderOnceSuccess', 'rendered ' + this.timer.count + ' files in ' + this.timer.duration + ' seconds');
  this.log.info('handleRenderOnceSuccess', 'generate success');
}

export default handleRenderOnceSuccess;
