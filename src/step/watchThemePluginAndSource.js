import chokidar from 'chokidar';
import path from 'path';

function watchThemePluginAndSource() {
  this.watcher = chokidar.watch([
    path.resolve(this.cwd, this.config.theme_dir),
    path.resolve(this.cwd, this.config.plugin_dir),
    path.resolve(this.cwd, this.config.source_dir)
  ]);
  this.log.verbose('watchThemePluginAndSource', this.watcher);
}

export default watchThemePluginAndSource;
