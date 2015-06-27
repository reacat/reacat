#!/usr/bin/env node

var program = require('commander');
var pkg = require('../package.json');
var log = require('npmlog');
var reacat = require('../index');

program
  .version(pkg.version)
  .option('--verbose', 'display more logs');

program
  .command('generate')
  .description('generate your awesome website')
  .option('-w, --watch', 'watch source change')
  .action(function(options) {
    reacat.generate({
      watch: options.watch,
      verbose: program.verbose
    });
  });

program
  .command('serve')
  .description('serve the public dir')
  .action(function() {
    reacat.generate({
      watch: true,
      verbose: program.verbose
    });
    reacat.serve({
      verbose: program.verbose
    });
  });

program.parse(process.argv);
