import React from 'react';

function renderToStaticMarkup() {
  const ThemeEntry = this.theme;
  Object.keys(this.sources).forEach((filePath) => {
    const source = this.sources[filePath];
    if (!source.render) return;
    let renderContent = React.renderToStaticMarkup(
      <ThemeEntry
        config={this.config}
        {...source}/>
    );
    renderContent = '<!DOCTYPE html>\n' + renderContent;
    source.renderContent = renderContent;
  });
  this.log.verbose('renderToStaticMarkup', JSON.stringify(this.sources, null, 2));
}

export default renderToStaticMarkup;
