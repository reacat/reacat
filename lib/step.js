'use strict';

var log = require('npmlog');
var fs = require('fs-extra');
var path = require('path');
var yaml = require('js-yaml');
var objectAssign = require('object-assign');
var defaultConfig = require('./defaultConfig');
var chokidar = require('chokidar');
var Promise = require('es6-promise').Promise;
var http = require('http');
var ecstatic = require('ecstatic');
var uncache = require('./util/uncache');
var glob = require('glob');
var React = require('react');

function initLogLevel() {
  if (this.options.verbose) log.level = 'verbose';
  this.log = log;
  this.log.verbose('initLogLevel');
}

function getConfig() {
  this.cwd = process.cwd();
  this.config = objectAssign({}, defaultConfig, yaml.safeLoad(fs.readFileSync(path.resolve(this.cwd, 'config.yml'), 'utf8')));
  this.log.verbose('getConfig', this.config);
}

function watchThemePluginAndSource() {
  this.watcher = chokidar.watch([path.resolve(this.cwd, this.config.theme_dir), path.resolve(this.cwd, this.config.plugin_dir), path.resolve(this.cwd, this.config.source_dir)]);
  this.log.verbose('watchThemePluginAndSource', this.watcher);
}

function handleWatch() {
  var _this = this;

  return new Promise(function (resolve, reject) {
    Promise.resolve().then(renderOnce.bind(_this))['catch'](handleError.bind(_this));
    _this.watcher.on('change', function () {
      Promise.resolve().then(renderOnce.bind(_this))['catch'](handleError.bind(_this));
    });
    _this.watcher.on('error', function (err) {
      return reject(err);
    });
  });
}

function renderOnce() {
  var _this2 = this;

  return new Promise(function (resolve, reject) {
    if (_this2.options.tiny) {
      Promise.resolve().then(timerStart.bind(_this2)).then(getTheme.bind(_this2)).then(getSources.bind(_this2)).then(getPlugins.bind(_this2)).then(execPlugins.bind(_this2)).then(renderToStaticMarkup.bind(_this2)).then(clearPublicDir.bind(_this2)).then(writeToPublicDir.bind(_this2)).then(timerStop.bind(_this2)).then(handleRenderOnceSuccess.bind(_this2)).then(function () {
        return resolve();
      })['catch'](function (err) {
        return reject(err);
      });
      return;
    }
    reject(new Error('Sorry, normal mode is not ready, please use --tiny option'));
  });
}

function handleErrorAndExitProcess(err) {
  handleError.call(this, err);
  process.exit(1);
}

function servePublic() {
  http.createServer(ecstatic({ root: this.config.public_dir })).listen(this.config.dev_port);
}

function handleServeSuccess() {
  this.log.info('handleServeSuccess', 'serve ' + this.config.public_dir + ' success');
  this.log.info('handleServeSuccess', 'http://localhost:' + this.config.dev_port);
}

function timerStart() {
  this.timer = {};
  this.timer.start = new Date();
}

function getTheme() {
  var themePath = path.resolve(this.cwd, this.config.theme_dir, this.config.theme);
  this.theme = require(themePath);
  // node will always cache the required module, so we should uncache it and it's children modules.
  uncache(themePath);
  this.log.verbose('getTheme', this.theme);
}

function getSources() {
  var _this3 = this;

  var filePaths = glob.sync('**', {
    cwd: path.resolve(this.cwd, this.config.source_dir),
    nodir: true
  });
  this.sources = filePaths.map(function (filePath) {
    return path.resolve(_this3.cwd, _this3.config.source_dir, filePath);
  }).reduce(function (prev, filePath) {
    prev[filePath] = {
      filePath: filePath,
      fileContent: fs.readFileSync(filePath, 'utf8')
    };
    return prev;
  }, {});
  this.log.verbose('getSources', this.sources);
}

function getPlugins() {
  var _this4 = this;

  this.plugins = this.config.plugins.map(function (pluginName) {
    var pluginPath = path.resolve(_this4.cwd, _this4.config.plugin_dir, pluginName);
    var plugin = require(pluginPath);
    uncache(pluginPath);
    return plugin;
  });
  this.log.verbose('getPlugins', this.plugins);
}

function execPlugins() {
  var _this5 = this;

  return this.plugins.reduce(function (prev, plugin) {
    return prev.then(plugin.bind(_this5));
  }, Promise.resolve());
}

function renderToStaticMarkup() {
  var _this6 = this;

  var ThemeEntry = this.theme;
  Object.keys(this.sources).forEach(function (filePath) {
    var source = _this6.sources[filePath];
    if (!source.page) return;
    var Content = source.page.Content;
    var props = {
      config: _this6.config,
      page: source.page
    };
    // http://facebook.github.io/react/docs/top-level-api.html#react.rendertostaticmarkup
    var renderContent = React.renderToStaticMarkup(React.createElement(
      ThemeEntry,
      props,
      React.createElement(Content, props)
    ));
    renderContent = '<!DOCTYPE html>\n' + renderContent;
    source.renderContent = renderContent;
    _this6.log.verbose('renderToStaticMarkup', renderContent);
  });
}

function clearPublicDir() {
  var publicDir = path.resolve(this.cwd, this.config.public_dir);
  fs.removeSync(publicDir);
  this.log.verbose('clearPublicDir', publicDir);
}

function writeToPublicDir() {
  var _this7 = this;

  var publicDir = path.resolve(this.cwd, this.config.public_dir);
  var count = 0;
  Object.keys(this.sources).forEach(function (filePath) {
    var source = _this7.sources[filePath];
    if (!source.page) return;
    var writePath = path.resolve(publicDir, source.page.url.replace(/^\//, ''));
    fs.mkdirsSync(path.dirname(writePath));
    fs.writeFileSync(writePath, source.renderContent, {
      encoding: 'utf8'
    });
    count += 1;
  });
  this.timer.count = count;
  this.log.verbose('writeToPublicDir', publicDir);
}

function timerStop() {
  this.timer.stop = new Date();
  this.timer.duration = (this.timer.stop - this.timer.start) / 1000;
}

function handleRenderOnceSuccess() {
  this.log.info('handleRenderOnceSuccess', 'rendered ' + this.timer.count + ' files in ' + this.timer.duration + ' seconds');
  this.log.info('handleRenderOnceSuccess', 'generate success');
}

function handleError(err) {
  this.log.error('handleError', err.message);
  if (err.stack) {
    this.log.error('handleError', err.stack);
  }
}

module.exports = {
  initLogLevel: initLogLevel,
  getConfig: getConfig,
  watchThemePluginAndSource: watchThemePluginAndSource,
  handleWatch: handleWatch,
  renderOnce: renderOnce,
  handleErrorAndExitProcess: handleErrorAndExitProcess,
  servePublic: servePublic,
  handleServeSuccess: handleServeSuccess,
  timerStart: timerStart,
  getTheme: getTheme,
  getSources: getSources,
  getPlugins: getPlugins,
  execPlugins: execPlugins,
  renderToStaticMarkup: renderToStaticMarkup,
  clearPublicDir: clearPublicDir,
  writeToPublicDir: writeToPublicDir,
  timerStop: timerStop,
  handleRenderOnceSuccess: handleRenderOnceSuccess,
  handleError: handleError
};