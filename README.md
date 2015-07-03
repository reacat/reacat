Reacat [![Build Status](https://travis-ci.org/reacat/reacat.svg?branch=master)](https://travis-ci.org/reacat/reacat)
===

> Use React to generate your awesome static website.

Homepage: [http://reacat.com](http://reacat.com)

## Features

### Static website generator

Reacat came about from our love of [React](http://facebook.github.io/react/) and was inspired by [Jekyll](http://jekyllrb.com/) & [Hexo](https://hexo.io/).

- [x] Render html and markdown file as pages
- [x] Render ***React components*** as pages, ***support es6 format***!
- [x] Be able to only [render static markup](http://facebook.github.io/react/docs/top-level-api.html#react.rendertostaticmarkup)

### Plugins and Themes

Reacat has a powerful plugin system, as well as theme system. The most amazing thing is you can write them with React.

- [x] Search themes and plugins in npm
- [x] Write your own themes and plugins with React
- [x] Publish your themes and plugins to npm

### Ready to build application

If you have a backend which only gives Ajax API, such as a BAAS platform, Reacat is ready to build application pleasantly.

- [ ] Automatic inserting bundled js into pages
- [ ] Use [react-router](https://github.com/rackt/react-router) to generate a single page app
- [ ] Uglify bundled js to adapt production environment

## Usage

### Install Reacat

```shell
$ [sudo] npm install reacat -g
```

### Create a new project

```shell
$ reacat init <project-name>
$ cd <project-name>
$ npm install
$ npm start
```

### Create a new page

Add a `.html` or `.md` file to source dir with front matter in the head to create a new page.

Add a `.jsx` file to source dir which export a class `YourPageComponent` extended from `React.Component` will also create a new page. In this case, you can define a static constant `frontMatter` in `YourPageComponent`.

### Configuration

Edit `config.json` to configure your project.

### Custom your theme

### Create a new plugin

## License

The MIT License (MIT)
 
Copyright (c) 2015 Xcat Liu
 
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:
 
The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
 
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
