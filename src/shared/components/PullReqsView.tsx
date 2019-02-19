import React, { Component } from 'react';
import styled from 'styled-components';
import { RouteComponentProps } from 'react-router-dom';

import { allPRsStub } from '../allPRsStub';
import PullReqView from './PullReqView';
import { baseUrl, PullDetails } from '../constants';

const Container = styled.div`
  margin: 30px 10px;
`;

const Tag = styled.span`
  background-color: #000;
  color: #fff;
  padding: 5px;
  border-radius: 5px;
`;

type PullReqsViewState = {
  pulls: PullDetails[];
}



class PullReqsView extends Component<RouteComponentProps<any>, PullReqsViewState> {
  state = {
    pulls: [],
  }
  
  componentDidMount() {
    console.log(this.props)
    // const repoPath = `${baseUrl}/repos${location.pathname}/pulls`;
    // fetch(repoPath)
    //   .then(res => res.json())
    //   .then(pulls => {
    //     // title, updated_at, created_at, html_url, user.login, requested_reviewers, reviewer's avator, state, number(PR#)
    //     const allPulls = this.formatData(pulls, repoPath);
    //     // get PR info https://api.github.com/repos/styled-components/styled-components/pulls/2344

    //     // get last commit https://api.github.com/repos/styled-components/styled-components/pulls/2344/commits

    //     // get last comment https://api.github.com/repos/styled-components/styled-components/pulls/2344/comments


    //     this.setState({ lookupValue: '', allPulls });
    //   })
    //   .catch(error => console.error("ERROR:", error))


      // /* use stub
      const pulls = this.formatData(allPRsStub);
      this.setState({pulls})
      // */

  }

  formatData = (allPulls: Record<string, any>) => {
    return allPulls.map((pull: Record<string, any>) => {
      const reviewers = pull.requested_reviewers.map((reviewer: Record<string, any>) => ({
        username: reviewer.login,
        avatar: reviewer.avatar_url
      }));
      return {
        title: pull.title,
        user: pull.user.login,
        prNumber: pull.number,
        url: pull.html_url,
        state: pull.state,
        createdAt: pull.created_at,
        lastUpdated: pull.updated_at,
        reviewers,
      }
    })
  }

  getLastCommentAndCommit(prNum: string) {
    
    const {owner, repo} = this.props.match && this.props.match.params;
    const repoPath = `${baseUrl}/repos/${owner}/${repo}/pulls`;
    const getComments = fetch(`${repoPath}/${prNum}/comments`).then(res => res.json());
    const getCommits = fetch(`${repoPath}/${prNum}/commits`).then(res => res.json());
    Promise.all([getComments, getCommits])
      .then(([comments, commits]) => {
        console.log("comments and commits>>>>>>>>>>>>", {
        lastCommentBy: comments && comments[comments.length - 1].user.login,
        lastCommentAt: comments && comments[comments.length - 1].created_at,
        lastCommitBy: commits[commits.length - 1].committer.login,
        lastCommitAt: commits[commits.length - 1].commit.committer.date
        })
      })
  }

  render() {
    const {owner, repo} = this.props.match && this.props.match.params;
    const { pulls } = this.state;
    return (
    <Container>
      <h2>{owner} / {repo}</h2>
      <Tag>Total open PRs: {pulls.length}</Tag>
      {pulls.map((pull: PullDetails) => <PullReqView key={pull.prNumber} details={pull} getLastCommentAndCommit={this.getLastCommentAndCommit}/>)}
    </Container>
    )
  }
}

export default PullReqsView;