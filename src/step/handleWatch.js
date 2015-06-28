import {Promise} from 'es6-promise';
import renderOnce from './renderOnce';
import handleError from './handleError';

function handleWatch() {
  return new Promise((resolve, reject) => {
    new Promise(resolve => resolve())
      .then(renderOnce.bind(this))
      .catch(handleError.bind(this));
    this.watcher.on('change', () => {
      new Promise(resolve => resolve())
        .then(renderOnce.bind(this))
        .catch(handleError.bind(this));
    });
    this.watcher.on('error', err => reject(err));
  });
}

export default handleWatch;
