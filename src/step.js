/* eslint no-use-before-define:0, block-scoped-var:0 */

import log from 'npmlog';
import fs from 'fs-extra';
import path from 'path';
import yaml from 'js-yaml';
import objectAssign from 'object-assign';
import defaultConfig from './defaultConfig';
import chokidar from 'chokidar';
import { Promise } from 'es6-promise';
import http from 'http';
import ecstatic from 'ecstatic';
import uncache from 'require-uncache';
import glob from 'glob';
import React from 'react';

function initLogLevel() {
  if (this.options.verbose) log.level = 'verbose';
  this.log = log;
  this.log.verbose('initLogLevel');
}

function getConfig() {
  this.cwd = process.cwd();
  this.config = objectAssign(
    {},
    defaultConfig,
    yaml.safeLoad(fs.readFileSync(path.resolve(this.cwd, 'config.yml'), 'utf8'))
  );
  this.log.verbose('getConfig', this.config);
}

function watchThemePluginAndSource() {
  this.watcher = chokidar.watch([
    path.resolve(this.cwd, this.config.theme_dir),
    path.resolve(this.cwd, this.config.plugin_dir),
    path.resolve(this.cwd, this.config.source_dir)
  ]);
  this.log.verbose('watchThemePluginAndSource', this.watcher);
}

function handleWatch() {
  return new Promise((resolve, reject) => {
    Promise.resolve()
      .then(renderOnce.bind(this))
      .catch(handleError.bind(this));
    this.watcher.on('change', () => {
      Promise.resolve()
        .then(renderOnce.bind(this))
        .catch(handleError.bind(this));
    });
    this.watcher.on('error', err => reject(err));
  });
}

function renderOnce() {
  return new Promise((resolve, reject) => {
    if (this.options.tiny) {
      Promise.resolve()
        .then(timerStart.bind(this))
        .then(getTheme.bind(this))
        .then(getSources.bind(this))
        .then(getPlugins.bind(this))
        .then(execPlugins.bind(this))
        .then(renderToStaticMarkup.bind(this))
        .then(clearPublicDir.bind(this))
        .then(writeToPublicDir.bind(this))
        .then(timerStop.bind(this))
        .then(handleRenderOnceSuccess.bind(this))
        .then(() => resolve())
        .catch(err => reject(err));
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
  http.createServer(
    ecstatic({root: this.config.public_dir})
  ).listen(this.config.dev_port);
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
  const themePath = path.resolve(this.cwd, this.config.theme_dir, this.config.theme);
  this.theme = require(themePath);
  // node will always cache the required module, so we should uncache it and it's children modules.
  uncache(themePath);
  this.log.verbose('getTheme', this.theme);
}

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
  this.log.verbose('getSources', this.sources);
}

function getPlugins() {
  this.plugins = this.config.plugins.map((pluginName) => {
    const pluginPath = path.resolve(this.cwd, this.config.plugin_dir, pluginName);
    const plugin = require(pluginPath);
    uncache(pluginPath);
    return plugin;
  });
  this.log.verbose('getPlugins', this.plugins);
}

function execPlugins() {
  return this.plugins.reduce((prev, plugin) => {
    return prev.then(plugin.bind(this));
  }, Promise.resolve());
}

function renderToStaticMarkup() {
  const ThemeEntry = this.theme;
  Object.keys(this.sources).forEach((filePath) => {
    const source = this.sources[filePath];
    if (!source.page) return;
    const Content = source.page.Content;
    const props = {
      config: this.config,
      page: source.page
    };
    // http://facebook.github.io/react/docs/top-level-api.html#react.rendertostaticmarkup
    let renderContent = React.renderToStaticMarkup(
      <ThemeEntry {...props}>
        <Content {...props}/>
      </ThemeEntry>
    );
    renderContent = '<!DOCTYPE html>\n' + renderContent;
    source.renderContent = renderContent;
    this.log.verbose('renderToStaticMarkup', renderContent);
  });
}

function clearPublicDir() {
  const publicDir = path.resolve(this.cwd, this.config.public_dir);
  fs.removeSync(publicDir);
  this.log.verbose('clearPublicDir', publicDir);
}

function writeToPublicDir() {
  const publicDir = path.resolve(this.cwd, this.config.public_dir);
  let count = 0;
  Object.keys(this.sources).forEach((filePath) => {
    const source = this.sources[filePath];
    if (!source.page) return;
    const writePath = path.resolve(publicDir, source.page.url.replace(/^\//, ''));
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

export default {
  initLogLevel,
  getConfig,
  watchThemePluginAndSource,
  handleWatch,
  renderOnce,
  handleErrorAndExitProcess,
  servePublic,
  handleServeSuccess,
  timerStart,
  getTheme,
  getSources,
  getPlugins,
  execPlugins,
  renderToStaticMarkup,
  clearPublicDir,
  writeToPublicDir,
  timerStop,
  handleRenderOnceSuccess,
  handleError
};
