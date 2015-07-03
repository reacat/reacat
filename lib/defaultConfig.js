'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = {
  title: 'Reacat',
  author: 'xcatliu',
  theme_dir: 'node_modules',
  plugin_dir: 'node_modules',
  source_dir: 'source',
  public_dir: 'public',
  theme: 'reacat-theme-boilerplate',
  permalink: ':path.html',
  date_format: 'YYYY-MM-DD',
  dev_port: 8000,
  plugins: ['reacat-plugin-front-matter', 'reacat-plugin-html', 'reacat-plugin-markdown', 'reacat-plugin-react']
};
module.exports = exports['default'];