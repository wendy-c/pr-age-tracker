import React, { Component } from 'react';
import styled from 'styled-components';

const Title = styled.h2`
  font-size: 25px;
`;

const Nav = styled.nav`
  display: flex;
  align-items: space-between;
`;

const Button = styled.button`
  background-color: #181c1d;
  border-radius: 5px;
  border: none;
  padding: 5px;
  font-size: 16px;

  i {
    padding: 0 5px;
    font-size: 20px;
  }
  
  a {
    color: #fff;
    display: flex;
  }
`;

type DashboardProps = {
  token: string;
}

class Dashboard extends Component<DashboardProps> {

  componentDidMount() {
    //make API call to get github user data
    
  }

  handleSignout = () => {
    // remove cookie
    // sign out from github??
    // redirect to Login
  }

  render() {
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