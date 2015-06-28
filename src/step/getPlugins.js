import path from 'path';
import uncache from '../util/uncache';

function getPlugins() {
  this.plugins = this.config.plugins.map((pluginName) => {
    const pluginPath = path.resolve(this.cwd, this.config.plugin_dir, pluginName);
    const plugin = require(pluginPath);
    uncache(pluginPath);
    return plugin;
  })
  this.log.verbose('getPlugins', this.plugins);
}

export default getPlugins;
