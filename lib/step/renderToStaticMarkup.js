'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function renderToStaticMarkup() {
  var _this = this;

  var ThemeEntry = this.theme;
  Object.keys(this.sources).forEach(function (filePath) {
    var source = _this.sources[filePath];
    if (!source.render) return;
    var renderContent = _react2['default'].renderToStaticMarkup(_react2['default'].createElement(ThemeEntry, _extends({
      config: _this.config
    }, source)));
    renderContent = '<!DOCTYPE html>\n' + renderContent;
    source.renderContent = renderContent;
  });
  this.log.verbose('renderToStaticMarkup', JSON.stringify(this.sources, null, 2));
}

exports['default'] = renderToStaticMarkup;
module.exports = exports['default'];