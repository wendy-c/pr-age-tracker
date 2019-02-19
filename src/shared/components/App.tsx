import React, { SFC } from 'react';
import { Route, Switch } from 'react-router-dom';

import Dashboard from './Dashboard';
import Login from './Login';
import Nav from './Nav';
import PullReqsView from './PullReqsView';

type AppProps = {}

const App: SFC<AppProps> = () => {
  // TODO: build /error page
  return (
    <Switch>
      <Nav>
      <Route path="/user/:user" component={Dashboard}/>
      <Route path="/repo/:owner/:repo" exact component={PullReqsView} />
      <Route path="/" exact component={Login}/>
      </Nav>
    </Switch>
  );

}

export default App;