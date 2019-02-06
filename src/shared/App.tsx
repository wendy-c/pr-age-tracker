import React, { SFC } from 'react';
import { Route, Switch } from 'react-router-dom';
import Dashboard from './Dashboard';
import Login from './Login';

type AppProps = {}

const App: SFC<AppProps> = () => {
  // TODO: build /error page
  return (
    <Switch>
      <Route path="/user/:user" component={Dashboard}/>
      <Route path="/" component={Login}/>
    </Switch>
  );

}

export default App;