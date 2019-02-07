import React, { Component } from 'react';
import { Redirect } from 'react-router';
import styled from 'styled-components';
import Cookies from 'js-cookie';

import RepoSelector from './RepoSelector';

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

const baseUrl = 'https://api.github.com';

class Dashboard extends Component<DashboardProps> {
  state = {
    isLoggedIn: true,
    repos: [],
    lookupValue: ''
  }

  componentDidMount() {
    //make API call to get github user repos
    const username = Cookies.get('username');
    fetch(`${baseUrl}/users/${username}/repos`)
      .then(res => res.json())
      .then(json => {
        const repos = json.map((repo: any) => repo.name)
        this.setState({repos})
      })
      .catch(error => console.error('ERROR: ', error))
  }

  handleSignout = () => {
    // remove cookie
    Cookies.remove('token');
    this.setState({isLoggedIn: false});
  }

  handleOnChange = (event: React.FormEvent<HTMLInputElement>) => {
    this.setState({lookupValue: event.currentTarget.value});
  }

  getPulls = () => {
    console.log(this.state.lookupValue)
    fetch(`${baseUrl}/repos/${this.state.lookupValue}/pulls`)
      .then(res => res.json())
      .then(pulls => {
        console.log("PRsssssssssssss", pulls)
        this.setState({lookupValue: ''});
      })
      .catch(error => console.error("ERROR:", error))
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
        <h4>Enter the repo you would like to look up</h4>
        <input placeholder="/:owner/:repo" onChange={this.handleOnChange} value={this.state.lookupValue}/>
        <button onClick={this.getPulls}>go!</button>
        <h4>Your repos</h4>
        {this.state.repos.map(repoName => <RepoSelector key={repoName} name={repoName}/>)}
      </div>
    );
  }
}

export default Dashboard;