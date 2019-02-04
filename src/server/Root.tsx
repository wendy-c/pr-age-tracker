import React from 'react';
import { StaticRouter } from 'react-router-dom';
import App from '../shared/App';
import { ServerStyleSheet } from 'styled-components';
import { renderToString } from 'react-dom/server';

const getRoot = (url: string) => {
  // set up styled-components for SSR
  const sheet = new ServerStyleSheet();
  
  const Root = () => <StaticRouter context={{}} location={url}><App /></StaticRouter>;
  
  const html = renderToString(sheet.collectStyles(<Root />));
  
  const styleTags = sheet.getStyleTags();

  return [html, styleTags];
}

export default getRoot;