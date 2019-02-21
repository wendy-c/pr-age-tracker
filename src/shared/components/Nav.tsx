import React, { Component } from 'react';
import { withRouter, RouteComponentProps } from 'react-router';
import styled, { ThemeProvider } from 'styled-components';
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

const SearchBar = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 10px;

  input {
    width: 80%;
    line-height: 2;
    min-width: 500px;
  }

  button {
    width: 10%;
    min-width: 80px;
  }
`;

const roundButton = {
  allRound: true,
}

const halfRoundButton = {
  allRound: false,
}

const Button = styled.button`
  background-color: #181c1d;
  color: #fff;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  border-top-left-radius: ${(props: any) => props.theme.allRound ? '5px' : '0px'};
  border-bottom-left-radius: ${(props: any) => props.theme.allRound ? '5px' : '0px'};
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
          <ThemeProvider theme={roundButton}>
          <Button onClick={this.handleSignout}>Sign out</Button>
          </ThemeProvider>
          </NavBar>
          <SearchBarContainer>
          <h3>Repo Look Up</h3>
          <SearchBar onSubmit={this.handleSearch}>
          <input placeholder="/:repoOwner/:repoName" onChange={this.handleOnChange} value={this.state.lookupValue} />
          <ThemeProvider theme={halfRoundButton}>
          <Button>Go</Button>
          </ThemeProvider>
          </SearchBar>
          </SearchBarContainer>
        </NavContainer>
        {this.props.children}
      </div>
    );
  }
} 

export default withRouter<any>(Nav);