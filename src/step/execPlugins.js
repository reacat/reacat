import {Promise} from 'es6-promise';

function execPlugins() {
  const p = new Promise(resolve => resolve());
  this.plugins.forEach(plugin => p.then(plugin.bind(this)));
  return p;
}

export default execPlugins;
