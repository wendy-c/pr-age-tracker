import React, { Component } from 'react';
import { withRouter, RouteComponentProps } from 'react-router';
import styled from 'styled-components';
import Cookies from 'js-cookie';

const Title = styled.h2`
  font-size: 25px;
`;

const NavContainer = styled.nav`
  display: flex;
  flex-direction: column;
`;

const NavBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 10px;

  input {
    width: 80%;
    line-height: 2;
    margin-right: 5px;
    min-width: 500px;
  }

  button {
    width: 10%;
    min-width: 80px;
  }
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

type NavProps = {

}

class Nav extends Component<NavProps & RouteComponentProps> {
  state = {
    lookupValue: '',
  }

  componentDidMount() {
    
    const {location} = this.props;
    const token = Cookies.get('token');
    const username = Cookies.get("username");
    const isRoot = location.pathname === '/';
    
    if (!token && !isRoot) {
      this.props.history.push('/')
    }

    if (token && isRoot) {
      this.props.history.push(`/user/${username}`);
    }
  }

  handleSignout = () => {
    // remove cookie
    Cookies.remove('token');
    this.setState({ isLoggedIn: false, isRoot: true });
    this.props.history.push('/')
  }  
  
  handleOnChange = (event: React.FormEvent<HTMLInputElement>) => {
    this.setState({ lookupValue: event.currentTarget.value });
  }

  handleSearch = () => {
    // TODO: check for invalid input
    // redirect to /repo/:owner/:repo
    this.props.history.push(`/repo${this.state.lookupValue}`)
    this.setState({lookupValue: ''});
  }

  render() {
    
    if (this.props.location.pathname === "/") {
      return this.props.children;
    }
    return (
      <div>
        <NavContainer>
          <NavBar>
          <Title>Pull Request Age Tracker</Title>
          <Button onClick={this.handleSignout}>Sign out</Button>
          </NavBar>
          <SearchBarContainer>
          <h3>Repo Look Up</h3>
          <SearchBar>
          <input placeholder="/:repoOwner/:repoName" onChange={this.handleOnChange} value={this.state.lookupValue} />
          <Button onClick={this.handleSearch}>GO</Button>
          </SearchBar>
          </SearchBarContainer>
        </NavContainer>
        {this.props.children}
      </div>
    );
  }
} 

export default withRouter<any>(Nav);