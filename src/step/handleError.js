function handleError(err) {
  this.log.error('handleError', err.message);
  if (err.stack) {
    this.log.error('handleError', err.stack);    
  }
}

export default handleError;
