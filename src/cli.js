#!/usr/bin/env node

import program from 'commander';
import pkg from '../package.json';
import reacat from './index';

program
  .version(pkg.version);

program
  .command('build')
  .description('build your awesome website')
  .option('-t, --tiny', 'use renderToStaticMarkup instead of renderToString,' +
    ' will lose all React virtual dom event, as well as some lifecycle methods.' +
    ' For more infomation, visit: http://facebook.github.io/react/docs/top-level-api.html#react.rendertostaticmarkup')
  .option('-w, --watch', 'watch source change')
  .option('-s, --serve', 'serve the public dir')
  .option('-v, --verbose', 'display more logs')
  .action((options) => {
    reacat.build({
      watch: options.watch,
      verbose: options.verbose,
      tiny: options.tiny
    });
    if (options.serve) {
      reacat.serve({
        verbose: options.verbose
      });
    }
  });

program
  .command('serve')
  .description('serve the public dir')
  .option('-v, --verbose', 'display more logs')
  .action((options) => {
    reacat.serve({
      verbose: options.verbose
    });
  });

program.parse(process.argv);
