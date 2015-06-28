import path from 'path';
import fs from 'fs-extra';

function renderToPublicDir() {
  const publicDir = path.resolve(this.cwd, this.config.public_dir);
  let count = 0;
  Object.keys(this.sources).forEach((filePath) => {
    const source = this.sources[filePath];
    if (!source.render) return;
    const whitePath = path.resolve(publicDir, source.page.permalink.replace(/^\//, ''));
    fs.mkdirsSync(path.dirname(whitePath));
    fs.writeFileSync(whitePath, source.renderContent, {
      encoding: 'utf8'
    });
    count += 1;
  });
  this.timer.count = count;
  this.log.verbose('renderToPublicDir', publicDir);
}

export default renderToPublicDir;
