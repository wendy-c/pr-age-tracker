import React, { Component } from 'react';
// import { Redirect } from 'react-router';
import { RouteComponentProps } from "react-router-dom";
import {connect} from 'react-redux';
// import styled from 'styled-components';

import RepoSelector from './RepoSelector';
// import {allReposStub} from '../allReposStub';
import {addData} from '../actions'

type RouteParams = {
  user: string;
};

interface DashboardProps
  extends RouteComponentProps<RouteParams>,
    React.Props<RouteParams> {
  addData: (data: any) => void;
  [key: string]: any;
}

const baseUrl = 'https://api.github.com';

class Dashboard extends Component<DashboardProps> {
  state = {
    // isLoggedIn: true,
  }

  componentDidMount() {
    //make API call to get github user repos
    const { user } = this.props.match && this.props.match.params;
    fetch(`${baseUrl}/users/${user}/repos`)
      .then(res => res.json())
      .then(json => {
        const getPulls = json.map((repo: any) => {
          return this.getPulls(repo.name);
        })

        Promise.all(getPulls).then(res => {
          // res = [{[repo.name]: [{pr}, {pr}]}]
          const repos = res.reduce((acc: any, repo: any) => {
            return {...acc, ...repo}
          }, {})
          this.props.addData({
            [user]: repos
          })
        })
      })
      .catch(error => console.error('ERROR: ', error))
    
  }

  getPulls = (repo: string) => {
    const { user } = this.props.match && this.props.match.params;
    return fetch(`${baseUrl}/repos/${user}/${repo}/pulls`)
      .then(res => res.json())
      .then(pulls => {
        return {
          [repo]: {
            pulls,
            alreadyFetchedPulls: true
          }
        }

      })
      .catch(error => console.error("ERROR:", error))
  }

  render() {
    // if (!this.state.isLoggedIn) {
    //   return <Redirect to="/" />;
    // }
    const {repoList, repos} = this.props;
    const { user } = this.props.match && this.props.match.params;
    
    return (
      <div>
          <div>
            <h2><a href={`https://github.com/${user}`}>{user}</a> / All Repository</h2>
            {repoList && repoList.map((repoName: string) => <RepoSelector key={repoName} user={user} repoName={repoName} prTotal={repos[repoName] && repos[repoName].length || 0}/>)}
          </div>
        {this.props.children}
      </div>
    );
  }
}

const mapStateToProps = (state: any, ownProps: any)  => {
  const { user } = ownProps.match && ownProps.match.params;
  const repoList = state[user] && Object.keys(state[user]) || [];
  const repos = state[user] || {}
  return { repoList, repos };
}

const mapDispatchToProps = {
  addData,
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);