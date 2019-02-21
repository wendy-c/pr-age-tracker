import React, { SFC } from 'react';
import { Route, Switch } from 'react-router-dom';
import styled from 'styled-components';

import Dashboard from './Dashboard';
import Login from './Login';
import Nav from './Nav';
import PullReqsView from './PullReqsView';

const GlobalStyles = styled.div`
  font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";
  font-size: 14px;
  letter-spacing: .2px;
  color: "#181c1d";

  a {
    text-decoration: none;
    color: #000;

    &:visited {
      color: #000;
    }

    &:hover {
      text-decoration: underline;
      color: #137CBD;
    }
  }
`;

type AppProps = {}

const App: SFC<AppProps> = () => {
  // TODO: build /error page
  return (
    <GlobalStyles>
    <Switch>
      <Nav>
      <Route path="/user/:user" component={Dashboard}/>
      <Route path="/repo/:owner/:repo" exact component={PullReqsView} />
      <Route path="/" exact component={Login}/>
      </Nav>
    </Switch>
    </GlobalStyles>
  );

}

export default App;