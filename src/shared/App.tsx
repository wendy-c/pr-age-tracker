import React, { SFC } from 'react';
import { Route, Switch } from 'react-router-dom';

import Dashboard from './Dashboard';
import Login from './Login';
import Nav from './Nav';
import PRAgeView from './PRAgeView';

type AppProps = {}

const App: SFC<AppProps> = () => {
  // TODO: build /error page
  return (
    <Switch>
      <Nav>
      <Route path="/user/:user" component={Dashboard}/>
      <Route path="/pr/:owner/:repo" component={PRAgeView} />
      <Route path="/" exact component={Login}/>
      </Nav>
    </Switch>
  );

}

export default App;