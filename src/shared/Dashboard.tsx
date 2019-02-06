import React, { Component } from 'react';
import { Redirect } from 'react-router';
import styled from 'styled-components';
import Cookies from 'js-cookie';

const Title = styled.h2`
  font-size: 25px;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Button = styled.button`
  background-color: #181c1d;
  color: #fff;
  border-radius: 5px;
  border: none;
  padding: 5px;
  font-size: 16px;

  i {
    padding: 0 5px;
    font-size: 20px;
  }
`;

type DashboardProps = {
  token: string;
}

class Dashboard extends Component<DashboardProps> {
  state = {
    isLoggedIn: true
  }

  componentDidMount() {
    //make API call to get github user data
    console.log("Ruuning componentDidMount")
  }

  handleSignout = () => {
    // remove cookie
    // sign out from github??
    Cookies.remove('token');
    this.setState({isLoggedIn: false});

  }

  render() {
    if (!this.state.isLoggedIn) {
      return <Redirect to="/"/>;
    }
    return (
      <div>
        <Nav>
        <Title>Pull Request Age Tracker</Title>
        <Button onClick={this.handleSignout}>Sign out</Button>
        </Nav>
      </div>
    );
  }
}

export default Dashboard;