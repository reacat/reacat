/* eslint no-use-before-define:0, block-scoped-var:0 */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _npmlog = require('npmlog');

var _npmlog2 = _interopRequireDefault(_npmlog);

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _jsYaml = require('js-yaml');

var _jsYaml2 = _interopRequireDefault(_jsYaml);

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var _defaultConfig = require('./defaultConfig');

var _defaultConfig2 = _interopRequireDefault(_defaultConfig);

var _chokidar = require('chokidar');

var _chokidar2 = _interopRequireDefault(_chokidar);

var _es6Promise = require('es6-promise');

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _ecstatic = require('ecstatic');

var _ecstatic2 = _interopRequireDefault(_ecstatic);

var _requireUncache = require('require-uncache');

var _requireUncache2 = _interopRequireDefault(_requireUncache);

var _glob = require('glob');

var _glob2 = _interopRequireDefault(_glob);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function initLogLevel() {
  if (this.options.verbose) _npmlog2['default'].level = 'verbose';
  this.log = _npmlog2['default'];
  this.log.verbose('initLogLevel');
}

function getConfig() {
  this.cwd = process.cwd();
  this.config = (0, _objectAssign2['default'])({}, _defaultConfig2['default'], _jsYaml2['default'].safeLoad(_fsExtra2['default'].readFileSync(_path2['default'].resolve(this.cwd, 'config.yml'), 'utf8')));
  this.log.verbose('getConfig', this.config);
}

function watchThemePluginAndSource() {
  this.watcher = _chokidar2['default'].watch([_path2['default'].resolve(this.cwd, this.config.theme_dir), _path2['default'].resolve(this.cwd, this.config.plugin_dir), _path2['default'].resolve(this.cwd, this.config.source_dir)]);
  this.log.verbose('watchThemePluginAndSource', this.watcher);
}

function handleWatch() {
  var _this = this;

  return new _es6Promise.Promise(function (resolve, reject) {
    _es6Promise.Promise.resolve().then(renderOnce.bind(_this))['catch'](handleError.bind(_this));
    var timeout = undefined;
    _this.watcher.on('change', function () {
      if (timeout) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(function () {
        _es6Promise.Promise.resolve().then(renderOnce.bind(_this))['catch'](handleError.bind(_this));
      }, 1000);
    });
    _this.watcher.on('error', function (err) {
      return reject(err);
    });
  });
}

function renderOnce() {
  var _this2 = this;

  return new _es6Promise.Promise(function (resolve, reject) {
    if (_this2.options.tiny) {
      _es6Promise.Promise.resolve().then(timerStart.bind(_this2)).then(getTheme.bind(_this2)).then(getSources.bind(_this2)).then(getPlugins.bind(_this2)).then(execPlugins.bind(_this2)).then(renderToStaticMarkup.bind(_this2)).then(clearPublicDir.bind(_this2)).then(writeToPublicDir.bind(_this2)).then(timerStop.bind(_this2)).then(handleRenderOnceSuccess.bind(_this2)).then(function () {
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
  throw err;
}

function servePublic() {
  _http2['default'].createServer((0, _ecstatic2['default'])({ root: this.config.public_dir })).listen(this.config.dev_port);
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
  var themePath = _path2['default'].resolve(this.cwd, this.config.theme_dir, this.config.theme);
  this.theme = require(themePath);
  // node will always cache the required module, so we should uncache it and it's children modules.
  (0, _requireUncache2['default'])(themePath);
  this.log.verbose('getTheme', this.theme);
}

function getSources() {
  var _this3 = this;

  var filePaths = _glob2['default'].sync('**', {
    cwd: _path2['default'].resolve(this.cwd, this.config.source_dir),
    nodir: true
  });
  this.sources = filePaths.map(function (filePath) {
    return _path2['default'].resolve(_this3.cwd, _this3.config.source_dir, filePath);
  }).reduce(function (prev, filePath) {
    prev[filePath] = {
      filePath: filePath,
      fileContent: _fsExtra2['default'].readFileSync(filePath, 'utf8')
    };
    return prev;
  }, {});
  this.log.verbose('getSources', this.sources);
}

function getPlugins() {
  var _this4 = this;

  this.plugins = this.config.plugins.map(function (pluginName) {
    var pluginPath = _path2['default'].resolve(_this4.cwd, _this4.config.plugin_dir, pluginName);
    var plugin = require(pluginPath);
    (0, _requireUncache2['default'])(pluginPath);
    return plugin;
  });
  this.log.verbose('getPlugins', this.plugins);
}

function execPlugins() {
  var _this5 = this;

  return this.plugins.reduce(function (prev, plugin) {
    return prev.then(plugin.bind(_this5));
  }, _es6Promise.Promise.resolve());
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
    var renderContent = _react2['default'].renderToStaticMarkup(_react2['default'].createElement(
      ThemeEntry,
      props,
      _react2['default'].createElement(Content, props)
    ));
    renderContent = '<!DOCTYPE html>\n' + renderContent;
    source.renderContent = renderContent;
    _this6.log.verbose('renderToStaticMarkup', renderContent);
  });
}

function clearPublicDir() {
  var publicDir = _path2['default'].resolve(this.cwd, this.config.public_dir);
  _fsExtra2['default'].removeSync(publicDir);
  this.log.verbose('clearPublicDir', publicDir);
}

function writeToPublicDir() {
  var _this7 = this;

  var publicDir = _path2['default'].resolve(this.cwd, this.config.public_dir);
  var count = 0;
  Object.keys(this.sources).forEach(function (filePath) {
    var source = _this7.sources[filePath];
    if (source.page) {
      var writePath = _path2['default'].resolve(publicDir, source.page.url.replace(/^\//, ''));
      _fsExtra2['default'].mkdirsSync(_path2['default'].dirname(writePath));
      _fsExtra2['default'].writeFileSync(writePath, source.renderContent, {
        encoding: 'utf8'
      });
    } else {
      var writePath = _path2['default'].resolve(publicDir, _path2['default'].relative(_this7.config.source_dir, filePath));
      _fsExtra2['default'].copySync(filePath, writePath);
    }
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
  this.log.info('handleRenderOnceSuccess', 'generated ' + this.timer.count + ' files in ' + this.timer.duration + ' seconds');
}

function handleError(err) {
  this.log.error('handleError', err.message);
  if (err.stack) {
    this.log.error('handleError', err.stack);
  }
}

exports['default'] = {
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
module.exports = exports['default'];