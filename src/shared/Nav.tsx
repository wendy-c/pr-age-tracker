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

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  input {
    width: 80%;
    line-height: 2;
    margin-right: 5px;
    max-width: 500px;
  }

  button {
    width: 10%;
    max-width: 80px;
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
    shouldRedirect: false,
    redirectTo: ''
  }

  componentDidMount() {
    
    const token = Cookies.get('token');
    const username = Cookies.get("username");
    
    if (!token && location.pathname !== '/') {
      this.props.history.push('/')
    }

    if (token && location.pathname === '/') {
      this.props.history.push(`/user/${username}`);
    }
  }

  handleSignout = () => {
    // remove cookie
    Cookies.remove('token');
    this.setState({ isLoggedIn: false });
    this.props.history.push('/')
  }  
  
  handleOnChange = (event: React.FormEvent<HTMLInputElement>) => {
    this.setState({ lookupValue: event.currentTarget.value });
  }

  handleSearch = () => {
    // TODO: check for invalid input
    // redirect to /pr/:owner/:repo
    this.props.history.push(`/pr${this.state.lookupValue}`)
    this.setState({lookupValue: ''});
  }

  render() {
    return (
      <div>
        <NavContainer>
          <NavBar>
          <Title>Pull Request Age Tracker</Title>
          <Button onClick={this.handleSignout}>Sign out</Button>
          </NavBar>
          <h4>Enter the repo you would like to look up</h4>
          <SearchBar>
          <input placeholder="/:owner/:repo" onChange={this.handleOnChange} value={this.state.lookupValue} />
          <Button onClick={this.handleSearch}>go!</Button>
          </SearchBar>
        </NavContainer>
        {this.props.children}
      </div>
    );
  }
} 

export default withRouter<any>(Nav);