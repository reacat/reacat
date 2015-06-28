import {Promise} from 'es6-promise';
import timerStart from './timerStart';
import getTheme from './getTheme';
import getPlugins from './getPlugins';
import getSources from './getSources';
import execPlugins from './execPlugins';
import renderToStaticMarkup from './renderToStaticMarkup';
import clearPublicDir from './clearPublicDir';
import renderToPublicDir from './renderToPublicDir';
import timerStop from './timerStop';
import handleRenderOnceSuccess from './handleRenderOnceSuccess';

function renderOnce() {
  return new Promise((resolve, reject) => {
    new Promise(resolve_ => resolve_())
      .then(timerStart.bind(this))
      .then(getTheme.bind(this))
      .then(getPlugins.bind(this))
      .then(getSources.bind(this))
      .then(execPlugins.bind(this))
      .then(renderToStaticMarkup.bind(this))
      .then(clearPublicDir.bind(this))
      .then(renderToPublicDir.bind(this))
      .then(timerStop.bind(this))
      .then(handleRenderOnceSuccess.bind(this))
      .then(() => resolve())
      .catch(err => reject(err));
  });
}

export default renderOnce;
