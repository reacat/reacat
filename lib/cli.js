#!/usr/bin/env node
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _packageJson = require('../package.json');

var _packageJson2 = _interopRequireDefault(_packageJson);

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

_commander2['default'].version(_packageJson2['default'].version);

_commander2['default'].command('build').description('build your awesome website').option('-t, --tiny', 'use renderToStaticMarkup instead of renderToString,' + ' will lose all React virtual dom event, as well as some lifecycle methods.' + ' For more infomation, visit: http://facebook.github.io/react/docs/top-level-api.html#react.rendertostaticmarkup').option('-w, --watch', 'watch source change').option('-s, --serve', 'serve the public dir').option('-v, --verbose', 'display more logs').action(function (options) {
  _index2['default'].build({
    watch: options.watch,
    verbose: options.verbose,
    tiny: options.tiny
  });
  if (options.serve) {
    _index2['default'].serve({
      verbose: options.verbose
    });
  }
});

_commander2['default'].command('serve').description('serve the public dir').option('-v, --verbose', 'display more logs').action(function (options) {
  _index2['default'].serve({
    verbose: options.verbose
  });
});

_commander2['default'].parse(process.argv);