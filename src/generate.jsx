import {Promise} from 'es6-promise';
import log from 'npmlog';
import path from 'path';
import glob from 'glob';
import fs from 'fs-extra';
import yaml from 'js-yaml';
import marked from 'marked';
import objectAssign from 'object-assign';
import capitalize from 'capitalize';
import moment from 'moment';
import React from 'react';
import chokidar from 'chokidar';

function generate(options) {
  let context = {options};
  var p = new Promise(resolve => resolve())
    .then(initLogLevel.bind(context))
    .then(getConfig.bind(context))
    .then(renderOnce.bind(context));
  if (options.watch) {
    p.then(watchThemeAndSource.bind(context))
      .then(handleWatch.bind(context));
  }
  p.catch(handleError.bind(this));
}

function handleWatch() {
  return new Promise((resolve, reject) => {
    this.watcher.on('change', renderOnce.bind(this));
    this.watcher.on('error', err => reject(err));
  });
}

function renderOnce() {
  return new Promise(resolve => resolve())
    .then(getTheme.bind(this))
    .then(getMarkdownFiles.bind(this))
    .then(parseMarkdownFiles.bind(this))
    .then(mergeFrontMatters.bind(this))
    .then(renderToString.bind(this))
    .then(clearPublicDir.bind(this))
    .then(renderToPublicDir.bind(this))
    // .then(getJsxs.bind(context))
    .then(handleSuccess.bind(this))
    .catch(handleError.bind(this));
}

function initLogLevel() {
  if (this.options.verbose) log.level = 'verbose';
}

function watchThemeAndSource() {
  this.watcher = chokidar.watch([
    path.resolve(this.cwd, this.config.themes_dir),
    path.resolve(this.cwd, this.config.source_dir)
  ]);
}

function getConfig() {
  this.cwd = process.cwd();
  this.config = yaml.safeLoad(fs.readFileSync(path.resolve(this.cwd, '_config.yml'), 'utf8'));
  log.verbose('getConfig', JSON.stringify(this.config, null, 2));
}

function getTheme() {
  this.theme = require(path.resolve(this.cwd, this.config.themes_dir, this.config.theme));
  log.verbose('getTheme', this.theme);
}

// get all markdown files from source dir
function getMarkdownFiles() {
  return new Promise((resolve, reject) => {
    glob('**/*.{md,markdown,MD,MARKDOWN}', {
      cwd: path.resolve(this.cwd, this.config.source_dir)
    }, (err, files) => {
      if (err) return reject(err);
      this.markdownFiles = files.map(file => path.resolve(this.cwd, this.config.source_dir, file));
      log.verbose('getMarkdownFiles', JSON.stringify(this.markdownFiles, null, 2));
      resolve();
    });
  });
}

function parseMarkdownFiles() {
  return Promise.all(this.markdownFiles.map((filePath, index) => {
    return new Promise((resolve, reject) => {
      const fileContent = fs.readFileSync(filePath, 'utf8');
      let fileContentSplitResult = fileContent.split('---');
      let frontMatterContent = '';
      let markdownContent = '';
      if (fileContentSplitResult.length === 1) {
        markdownContent = fileContent;
      } else {
        if (fileContentSplitResult[0].trim() === '') fileContentSplitResult.shift();
        frontMatterContent = fileContentSplitResult[0];
        fileContentSplitResult.shift();
        markdownContent = fileContentSplitResult.join('---');
      }
      const result = {
        filePath,
        frontMatter: yaml.safeLoad(frontMatterContent),
        markdownContent,
        htmlContent: marked(markdownContent)
      };
      if (!result.frontMatter) {
        result.frontMatter = {};
        log.warn('parseMarkdownFiles', filePath + ' has no frontMatter');
      }
      log.verbose('parseMarkdownFiles', JSON.stringify(result, null, 2));
      this.markdownFiles[index] = result;
      resolve();
    });
  }));
}

function mergeFrontMatters() {
  this.markdownFiles.forEach((markdownFile) => {
    let relative = path.relative(path.resolve(this.cwd, this.config.source_dir), markdownFile.filePath);
    if (!markdownFile.frontMatter.layout) {
      markdownFile.frontMatter.layout = 'index';
    }
    if (!markdownFile.frontMatter.title) {
      let title = markdownFile.filePath;
      title = path.basename(title, path.extname(title));
      title = capitalize.words(title.replace(/[-_]/g, ' '));
      markdownFile.frontMatter.title = title;
    }
    if (!markdownFile.frontMatter.permalink) {
      let permalink = path.join('/', path.dirname(relative), path.basename(relative, path.extname(relative)));
      markdownFile.frontMatter.permalink = permalink;
    }
    if (!markdownFile.frontMatter.date) {
      const fileStat = fs.statSync(markdownFile.filePath);
      let date = moment(fileStat.birthtime).format(this.config.date_format);
      markdownFile.frontMatter.date = date;
    } else {
      markdownFile.frontMatter.date = moment(markdownFile.frontMatter.date).format(this.config.date_format);
    }
  });
  log.verbose('mergeFrontMatters', JSON.stringify(this.markdownFiles, null, 2));
}

function renderToString() {
  const ThemeEntry = this.theme;
  this.markdownFiles.forEach((markdownFile) => {
    let renderResult = React.renderToString(
      <ThemeEntry
        config={this.config}
        frontMatter={markdownFile.frontMatter}>
        {markdownFile.htmlContent}
      </ThemeEntry>
    );
    renderResult = '<!DOCTYPE html>\n' + renderResult;
    markdownFile.renderResult = renderResult;
  });
  log.verbose('renderToString', JSON.stringify(this.markdownFiles, null, 2));
}

function clearPublicDir() {
  const public_dir = path.resolve(this.cwd, this.config.public_dir);
  log.verbose('clearPublicDir', public_dir);
  fs.removeSync(public_dir);
}

function renderToPublicDir() {
  const public_dir = path.resolve(this.cwd, this.config.public_dir);
  this.markdownFiles.forEach((markdownFile) => {
    const filePath = path.resolve(public_dir, markdownFile.frontMatter.permalink.replace(/^\//, '') + '.html');
    fs.mkdirsSync(path.dirname(filePath));
    fs.writeFileSync(filePath, markdownFile.renderResult, {
      encoding: 'utf8'
    });
  });
  log.verbose('renderToPublicDir', public_dir);
}

// get all jsx files from source dir
// function getJsxs() {
//   return new Promise((resolve, reject) => {
//     glob('**/*.jsx', {
//       cwd: path.resolve(this.cwd, this.config.source_dir)
//     }, (err, files) => {
//       if (err) return reject(err);
//       this.jsxs = files.map(file => path.resolve(this.cwd, this.config.source_dir, file));
//       log.verbose('getJsxs', this.jsxs);
//       resolve();
//     });
//   });
// }

function handleSuccess() {
  log.info('handleSuccess', 'generate success!');
}

function handleError(err) {
  log.error('handleError', err.message);
  if (err.stack) {
    log.error('handleError', err.stack);    
  }
  process.exit(1);
}

export default generate;