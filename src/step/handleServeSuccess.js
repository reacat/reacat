function handleServeSuccess() {
  this.log.info('handleServeSuccess', 'serve dir ' + this.config.public_dir + ' success');
  this.log.info('handleServeSuccess', 'http://localhost:' + this.config.dev_port);
}

export default handleServeSuccess;
