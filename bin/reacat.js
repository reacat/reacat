#!/usr/bin/env node

var program = require('commander');
var pkg = require('../package.json');
var log = require('npmlog');
var reacat = require('../index');

program
  .version(pkg.version);

program
  .command('build')
  .description('build your awesome website')
  .option('-w, --watch', 'watch source change')
  .option('-s, --serve', 'serve the public dir')
  .option('-v, --verbose', 'display more logs')
  .action(function(options) {
    reacat.build({
      watch: options.watch,
      verbose: options.verbose
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
  .action(function() {
    reacat.serve({
      verbose: options.verbose
    });
  });

program.parse(process.argv);
