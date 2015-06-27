'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _es6Promise = require('es6-promise');

var _npmlog = require('npmlog');

var _npmlog2 = _interopRequireDefault(_npmlog);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _glob = require('glob');

var _glob2 = _interopRequireDefault(_glob);

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _jsYaml = require('js-yaml');

var _jsYaml2 = _interopRequireDefault(_jsYaml);

var _marked = require('marked');

var _marked2 = _interopRequireDefault(_marked);

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var _capitalize = require('capitalize');

var _capitalize2 = _interopRequireDefault(_capitalize);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _chokidar = require('chokidar');

var _chokidar2 = _interopRequireDefault(_chokidar);

function generate(options) {
  var context = { options: options };
  var p = new _es6Promise.Promise(function (resolve) {
    return resolve();
  }).then(initLogLevel.bind(context)).then(getConfig.bind(context)).then(renderOnce.bind(context));
  if (options.watch) {
    p.then(watchThemeAndSource.bind(context)).then(handleWatch.bind(context));
  }
  p['catch'](handleError.bind(this));
}

function handleWatch() {
  var _this = this;

  return new _es6Promise.Promise(function (resolve, reject) {
    _this.watcher.on('change', renderOnce.bind(_this));
    _this.watcher.on('error', function (err) {
      return reject(err);
    });
  });
}

function renderOnce() {
  return new _es6Promise.Promise(function (resolve) {
    return resolve();
  }).then(getTheme.bind(this)).then(getMarkdownFiles.bind(this)).then(parseMarkdownFiles.bind(this)).then(mergeFrontMatters.bind(this)).then(renderToString.bind(this)).then(clearPublicDir.bind(this)).then(renderToPublicDir.bind(this))
  // .then(getJsxs.bind(context))
  .then(handleSuccess.bind(this))['catch'](handleError.bind(this));
}

function initLogLevel() {
  if (this.options.verbose) _npmlog2['default'].level = 'verbose';
}

function watchThemeAndSource() {
  this.watcher = _chokidar2['default'].watch([_path2['default'].resolve(this.cwd, this.config.themes_dir), _path2['default'].resolve(this.cwd, this.config.source_dir)]);
}

function getConfig() {
  this.cwd = process.cwd();
  this.config = _jsYaml2['default'].safeLoad(_fsExtra2['default'].readFileSync(_path2['default'].resolve(this.cwd, '_config.yml'), 'utf8'));
  _npmlog2['default'].verbose('getConfig', JSON.stringify(this.config, null, 2));
}

function getTheme() {
  this.theme = require(_path2['default'].resolve(this.cwd, this.config.themes_dir, this.config.theme));
  _npmlog2['default'].verbose('getTheme', this.theme);
}

// get all markdown files from source dir
function getMarkdownFiles() {
  var _this2 = this;

  return new _es6Promise.Promise(function (resolve, reject) {
    (0, _glob2['default'])('**/*.{md,markdown,MD,MARKDOWN}', {
      cwd: _path2['default'].resolve(_this2.cwd, _this2.config.source_dir)
    }, function (err, files) {
      if (err) return reject(err);
      _this2.markdownFiles = files.map(function (file) {
        return _path2['default'].resolve(_this2.cwd, _this2.config.source_dir, file);
      });
      _npmlog2['default'].verbose('getMarkdownFiles', JSON.stringify(_this2.markdownFiles, null, 2));
      resolve();
    });
  });
}

function parseMarkdownFiles() {
  var _this3 = this;

  return _es6Promise.Promise.all(this.markdownFiles.map(function (filePath, index) {
    return new _es6Promise.Promise(function (resolve, reject) {
      var fileContent = _fsExtra2['default'].readFileSync(filePath, 'utf8');
      var fileContentSplitResult = fileContent.split('---');
      var frontMatterContent = '';
      var markdownContent = '';
      if (fileContentSplitResult.length === 1) {
        markdownContent = fileContent;
      } else {
        if (fileContentSplitResult[0].trim() === '') fileContentSplitResult.shift();
        frontMatterContent = fileContentSplitResult[0];
        fileContentSplitResult.shift();
        markdownContent = fileContentSplitResult.join('---');
      }
      var result = {
        filePath: filePath,
        frontMatter: _jsYaml2['default'].safeLoad(frontMatterContent),
        markdownContent: markdownContent,
        htmlContent: (0, _marked2['default'])(markdownContent)
      };
      if (!result.frontMatter) {
        result.frontMatter = {};
        _npmlog2['default'].warn('parseMarkdownFiles', filePath + ' has no frontMatter');
      }
      _npmlog2['default'].verbose('parseMarkdownFiles', JSON.stringify(result, null, 2));
      _this3.markdownFiles[index] = result;
      resolve();
    });
  }));
}

function mergeFrontMatters() {
  var _this4 = this;

  this.markdownFiles.forEach(function (markdownFile) {
    var relative = _path2['default'].relative(_path2['default'].resolve(_this4.cwd, _this4.config.source_dir), markdownFile.filePath);
    if (!markdownFile.frontMatter.layout) {
      markdownFile.frontMatter.layout = 'index';
    }
    if (!markdownFile.frontMatter.title) {
      var title = markdownFile.filePath;
      title = _path2['default'].basename(title, _path2['default'].extname(title));
      title = _capitalize2['default'].words(title.replace(/[-_]/g, ' '));
      markdownFile.frontMatter.title = title;
    }
    if (!markdownFile.frontMatter.permalink) {
      var permalink = _path2['default'].join('/', _path2['default'].dirname(relative), _path2['default'].basename(relative, _path2['default'].extname(relative)));
      markdownFile.frontMatter.permalink = permalink;
    }
    if (!markdownFile.frontMatter.date) {
      var fileStat = _fsExtra2['default'].statSync(markdownFile.filePath);
      var date = (0, _moment2['default'])(fileStat.birthtime).format(_this4.config.date_format);
      markdownFile.frontMatter.date = date;
    } else {
      markdownFile.frontMatter.date = (0, _moment2['default'])(markdownFile.frontMatter.date).format(_this4.config.date_format);
    }
  });
  _npmlog2['default'].verbose('mergeFrontMatters', JSON.stringify(this.markdownFiles, null, 2));
}

function renderToString() {
  var _this5 = this;

  var ThemeEntry = this.theme;
  this.markdownFiles.forEach(function (markdownFile) {
    var renderResult = _react2['default'].renderToString(_react2['default'].createElement(
      ThemeEntry,
      {
        config: _this5.config,
        frontMatter: markdownFile.frontMatter },
      markdownFile.htmlContent
    ));
    renderResult = '<!DOCTYPE html>\n' + renderResult;
    markdownFile.renderResult = renderResult;
  });
  _npmlog2['default'].verbose('renderToString', JSON.stringify(this.markdownFiles, null, 2));
}

function clearPublicDir() {
  var public_dir = _path2['default'].resolve(this.cwd, this.config.public_dir);
  _npmlog2['default'].verbose('clearPublicDir', public_dir);
  _fsExtra2['default'].removeSync(public_dir);
}

function renderToPublicDir() {
  var public_dir = _path2['default'].resolve(this.cwd, this.config.public_dir);
  this.markdownFiles.forEach(function (markdownFile) {
    var filePath = _path2['default'].resolve(public_dir, markdownFile.frontMatter.permalink.replace(/^\//, '') + '.html');
    _fsExtra2['default'].mkdirsSync(_path2['default'].dirname(filePath));
    _fsExtra2['default'].writeFileSync(filePath, markdownFile.renderResult, {
      encoding: 'utf8'
    });
  });
  _npmlog2['default'].verbose('renderToPublicDir', public_dir);
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
  _npmlog2['default'].info('handleSuccess', 'generate success!');
}

function handleError(err) {
  _npmlog2['default'].error('handleError', err.message);
  if (err.stack) {
    _npmlog2['default'].error('handleError', err.stack);
  }
  process.exit(1);
}

exports['default'] = generate;
module.exports = exports['default'];