import * as React from "react";
import { hydrate } from "react-dom";
import { BrowserRouter } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import App from "../shared/components/App";
import { reducers } from '../shared/reducers';

// Grab the state from a global variable injected into the server-generated HTML
const preloadedState = (window as any).__PRELOADED_STATE__

// Allow the passed state to be garbage-collected
delete (window as any).__PRELOADED_STATE__

// Create Redux store with initial state
const store = createStore(reducers, preloadedState)

hydrate(<Provider store={store}><BrowserRouter><App /></BrowserRouter></Provider>, document.getElementById("app"));