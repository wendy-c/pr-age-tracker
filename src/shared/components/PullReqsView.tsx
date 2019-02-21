import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';

// import { allPRsStub } from '../allPRsStub';
import PullReqView from './PullReqView';
import { addData } from '../actions';
import { baseUrl, PullDetails } from '../constants';

const Container = styled.div`
  margin: 30px 10px;
`;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Tag = styled.span`
  background-color: #000;
  color: #fff;
  padding: 5px;
  border-radius: 5px;
`;

type PullReqsViewState = {
  
}

type RouteParams = {
  owner: string;
  repo: string;
}

interface PullReqsViewProps extends RouteComponentProps<RouteParams>, React.Props<RouteParams> { 
  addData: (data: any) => void;
  [key: string]: any;
}


class PullReqsView extends Component<PullReqsViewProps, PullReqsViewState> {

  componentDidMount () {
    const {owner, repo} = this.props.match && this.props.match.params;
    const repoPath = `${baseUrl}/repos/${owner}/${repo}/pulls`;
    fetch(repoPath)
      .then(res => res.json())
      .then(pulls => {
        
        const withCommentsCommits = pulls.map(async (pull: Record<string, any>) => {
          return this.getLastCommentAndCommit(pull);
        });

        Promise.all(withCommentsCommits).then(pullsData => {
          // add all pull requests details for this repo to redux
          this.props.addData({
            [owner]: {
              [repo]: pullsData
            }
          })
        })

      })
      .catch(error => console.error("ERROR:", error))


      /* use stub
      const pulls = this.formatData(allPRsStub);
      this.setState({pulls})
      */

  }

  formatData = (pull: Record<string, any>) => {    
      const reviewers = pull.requested_reviewers.map((reviewer: Record<string, any>) => ({
        username: reviewer.login,
        avatar: reviewer.avatar_url
      }));
      return {
        title: pull.title,
        user: pull.user.login,
        prNum: pull.number,
        url: pull.html_url,
        state: pull.state,
        createdAt: pull.created_at,
        lastUpdated: pull.updated_at,
        reviewers,
      }
    
  }

  getLastCommentAndCommit = (pull: any) => {
    
    const {owner, repo} = this.props.match && this.props.match.params;
    const repoPath = `${baseUrl}/repos/${owner}/${repo}/pulls`;
    const getComments = fetch(`${repoPath}/${pull.number}/comments`).then(res => res.json());
    const getCommits = fetch(`${repoPath}/${pull.number}/commits`).then(res => res.json());
    const getReviews = fetch(`${repoPath}/${pull.number}/reviews`).then(res => res.json());
    return Promise.all([getComments, getCommits, getReviews])
      .then(([comments, commits, reviews]) => {
        
        // get last comment by anyone besides the creator of the PR
        const lastCommentBy = comments.length && comments[comments.length - 1].user && comments[comments.length - 1].user.login || null
        const lastCommentAt = comments.length && comments[comments.length - 1].created_at || null;
        const lastCommitAt = commits.length && commits[commits.length - 1].commit && commits[commits.length - 1].commit.committer.date || null;
        const mainDetails = this.formatData(pull)
        const hasReview = Boolean(reviews.length);
        const status = hasReview ? reviews.reduce((acc: string, review: any) => {
          if (acc === 'APPROVED') {
            return acc;
          }
          return review.state;
        }) : 'NOT YET REVIEW';
        
        return {
          ...mainDetails,
          lastCommentBy,
          lastCommentAt,
          lastCommitAt,
          hasReview,
          status
          }
      })
      .catch(err => console.error("ERROR:", err))

  }

  render() {
    const {owner, repo} = this.props.match && this.props.match.params;
    const {pulls} = this.props;
    if (!pulls) {
      return <div>ERROR!!</div>
    }
    return (
    <Container>
      <HeaderContainer>
      <h2>{owner} / {repo}</h2>
      <Tag>Total open PRs: {pulls.length}</Tag>
      </HeaderContainer>
      {pulls.map((pull: PullDetails) => <PullReqView key={pull.prNum} details={pull} getLastCommentAndCommit={this.getLastCommentAndCommit}/>)}
    </Container>
    )
  }
}

const mapStateToProps = (state: any, ownProps: any) => {
  const {owner, repo} = ownProps.match && ownProps.match.params;
  console.log("STATE", state[owner])
  const pulls = state[owner] && state[owner][repo] || [];
 return { pulls };
}

const mapDispatchToProps = {
  addData,
}

export default connect(mapStateToProps, mapDispatchToProps)(PullReqsView);