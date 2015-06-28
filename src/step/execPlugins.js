import {Promise} from 'es6-promise';

function execPlugins() {
  return Promise.all(this.plugins.map(plugin => plugin.call(this)));
}

export default execPlugins;
