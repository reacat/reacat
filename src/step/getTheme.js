import path from 'path';
import uncache from '../util/uncache';

function getTheme() {
  const themePath = path.resolve(this.cwd, this.config.theme_dir, this.config.theme);
  this.theme = require(themePath);
  // node will always cache the required module, so we should uncache it and it's children modules.
  uncache(themePath);
  this.log.verbose('getTheme', this.theme);
}

export default getTheme;
