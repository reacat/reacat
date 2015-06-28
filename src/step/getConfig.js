import fs from 'fs-extra';
import path from 'path';
import yaml from 'js-yaml';
import objectAssign from 'object-assign';
import defaultConfig from '../defaultConfig';

function getConfig() {
  this.cwd = process.cwd();
  this.config = objectAssign(
    {},
    defaultConfig,
    yaml.safeLoad(fs.readFileSync(path.resolve(this.cwd, 'config.yml'), 'utf8'))
  );
  this.log.verbose('getConfig', JSON.stringify(this.config, null, 2));
}

export default getConfig;
