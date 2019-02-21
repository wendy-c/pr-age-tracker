import React, { Component } from 'react';
import { Redirect } from 'react-router';
import {connect} from 'react-redux';
// import styled from 'styled-components';
// import Cookies from 'js-cookie';

import RepoSelector from './RepoSelector';
import {allReposStub} from '../allReposStub';
import {addData} from '../actions'

type DashboardProps = {
  // token: string;
  addData: (data:any) => void;
}

const baseUrl = 'https://api.github.com';

class Dashboard extends Component<DashboardProps> {
  state = {
    isLoggedIn: true,
    repos: [],
    lookupValue: '',
    isExternalRepo: false
  }

  componentDidMount() {
    //make API call to get github user repos
    // const username = Cookies.get('username');
    // fetch(`${baseUrl}/users/${username}/repos`)
    //   .then(res => res.json())
    //   .then(json => {
    //     const repos = json.map((repo: any) => repo.name)
    //     this.setState({ repos })
    //   })
    //   .catch(error => console.error('ERROR: ', error))
    this.props.addData({test: 'this is a test'})
    this.setState({repos: allReposStub.map((repo: any) => repo.name)})
  }

  getPulls = () => {
    const repoPath = this.state.lookupValue;
    fetch(`${baseUrl}/repos${repoPath}/pulls`)
      .then(res => res.json())
      .then(pulls => {
        console.log("PRsssssssssssss", pulls)
        // title, updated_at, created_at, html_url, user.login, requested_reviewers, reviewer's avator, state, number(PR#)

        // get PR info https://api.github.com/repos/styled-components/styled-components/pulls/2344

        // get last commit https://api.github.com/repos/styled-components/styled-components/pulls/2344/commits

        // get last comment https://api.github.com/repos/styled-components/styled-components/pulls/2344/comments


        this.setState({ lookupValue: '', isExternalRepo: true });
      })
      .catch(error => console.error("ERROR:", error))
  }

  render() {
    if (!this.state.isLoggedIn) {
      return <Redirect to="/" />;
    }
    return (
      <div>
          <div>
            <h4>Your repos</h4>
            {this.state.repos.map(repoName => <RepoSelector key={repoName} name={repoName} />)}
          </div>
        {this.props.children}
      </div>
    );
  }
}

const mapDispatchToProps = {
  addData,
}

export default connect(null, mapDispatchToProps)(Dashboard);