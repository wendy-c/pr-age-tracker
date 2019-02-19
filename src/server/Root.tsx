import React from 'react';
import { StaticRouter } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { ServerStyleSheet } from 'styled-components';
import { renderToString } from 'react-dom/server';

import App from '../shared/components/App';

const getRoot = (url: string) => {
  // set up styled-components for SSR
  const sheet = new ServerStyleSheet();

  // wrap react router to App
  const Root = () => <StaticRouter context={{}} location={url}><App /></StaticRouter>;

  // create a Redux store instance
  const store = createStore(Root);
  
  const html = renderToString(sheet.collectStyles(<Provider store={store}><Root /></Provider>));
  
  // grab the inital style tags
  const styleTags = sheet.getStyleTags();

  // grab the initial state from our Redux store
  const preloadedState = store.getState();

  return [html, styleTags, preloadedState];
}

export default getRoot;