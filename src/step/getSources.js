import path from 'path';
import glob from 'glob';
import fs from 'fs-extra';

function getSources() {
  const filePaths = glob.sync('**', {
    cwd: path.resolve(this.cwd, this.config.source_dir),
    nodir: true
  });
  this.sources = filePaths
    .map(filePath => path.resolve(this.cwd, this.config.source_dir, filePath))
    .reduce((prev, filePath) => {
      prev[filePath] = {
        filePath: filePath,
        fileContent: fs.readFileSync(filePath, 'utf8')
      };
      return prev;
    }, {});
  this.log.verbose('getSources', JSON.stringify(this.sources, null, 2));
}

export default getSources;
