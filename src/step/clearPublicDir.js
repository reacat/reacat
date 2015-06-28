import fs from 'fs-extra';
import path from 'path';

function clearPublicDir() {
  const publicDir = path.resolve(this.cwd, this.config.public_dir);
  fs.removeSync(publicDir);
  this.log.verbose('clearPublicDir', publicDir);
}

export default clearPublicDir;
