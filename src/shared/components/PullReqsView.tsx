import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, RouteComponentProps } from "react-router-dom";
import styled from "styled-components";

import PullReqView from "./PullReqView";
import { addData } from "../actions";
import { baseUrl, PullDetails } from "../constants";

const Container = styled.div`
  margin: 30px 10px;
`;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Tag = styled.span`
  color: #202b33;
  border: 0.8px solid #202b33;
  padding: 5px;
  border-radius: 5px;
`;

const HeaderWarning = styled.h1`
  text-align: center;
  padding-top: 50px;
`;

type PullReqsViewState = {};

type RouteParams = {
  owner: string;
  repo: string;
};

interface PullReqsViewProps
  extends RouteComponentProps<RouteParams>,
    React.Props<RouteParams> {
  addData: (data: any) => void;
  [key: string]: any;
}

class PullReqsView extends Component<PullReqsViewProps, PullReqsViewState> {

  componentDidMount() {
    this.getEverything();
  }
  
  componentDidUpdate(prevProps: PullReqsViewProps) {
    console.log("in componentDidUpdate")
    // TODO: add live cycle event to account for when search bar come in with new params
    const { owner, repo } = this.props.match && this.props.match.params;
    const { owner: prevOwner, repo: prevRepo } = prevProps.match && prevProps.match.params;

    if (owner !== prevOwner || repo !== prevRepo) {
      this.getEverything();
    }

  }

  getEverything = () => {
    console.log("Get everything!!!")
    const { pulls, alreadyFetchedPulls } = this.props;
    if (pulls.length && alreadyFetchedPulls) {
      // skip calling GitHub /pulls if data is already in redux, fetch only comment, commits and reviews
      this.getAllCommentsCommitsAndReviews(pulls, true);
    }

    if (!alreadyFetchedPulls) {
      const { owner, repo } = this.props.match && this.props.match.params;
      const repoPath = `${baseUrl}/repos/${owner}/${repo}/pulls`;
      fetch(repoPath)
        .then(res => res.json())
        .then(pulls => {
          this.getAllCommentsCommitsAndReviews(pulls, false);
        })
        .catch(error => console.error("ERROR:", error));
    }
  }

  getAllCommentsCommitsAndReviews = (pulls: any, isFormatted: boolean) => {
    const { owner, repo } = this.props.match && this.props.match.params;
    const getCommentsCommitsReviews = pulls.map((pull: Record<string, any>) => {
      const prNum = isFormatted ? pull.prNum : pull.number;
      return this.getLastCommentAndCommit(pull, prNum, isFormatted);
    });

    Promise.all(getCommentsCommitsReviews).then(pullsData => {
      // add all pull requests details for this repo to redux
      this.props.addData({
        [owner]: {
          [repo]: {
            pulls: pullsData,
            alreadyFetchedPulls: true
          }
        }
      });
    });
  };

  formatData = (pull: Record<string, any>) => {
    const reviewers = pull.requested_reviewers.map(
      (reviewer: Record<string, any>) => ({
        username: reviewer.login,
        avatar: reviewer.avatar_url
      })
    );
    return {
      title: pull.title,
      user: pull.user.login,
      prNum: pull.number,
      url: pull.html_url,
      state: pull.state,
      createdAt: pull.created_at,
      lastUpdated: pull.updated_at,
      reviewers
    };
  };

  getLastCommentAndCommit = (pull: any, prNum: number, isFormatted: boolean) => {
    const { owner, repo } = this.props.match && this.props.match.params;
    const repoPath = `${baseUrl}/repos/${owner}/${repo}/pulls`;
    const getComments = fetch(`${repoPath}/${prNum}/comments`).then(res =>
      res.json()
    );
    const getCommits = fetch(`${repoPath}/${prNum}/commits`).then(res =>
      res.json()
    );
    const getReviews = fetch(`${repoPath}/${prNum}/reviews`).then(res =>
      res.json()
    );
    return Promise.all([getComments, getCommits, getReviews])
      .then(([comments, commits, reviews]) => {
        // get last comment by anyone besides the creator of the PR
        const lastCommentBy =
          (comments.length &&
            comments[comments.length - 1].user &&
            comments[comments.length - 1].user.login) ||
          null;
        const lastCommentAt =
          (comments.length && comments[comments.length - 1].created_at) || null;
        const lastCommitAt =
          (commits.length &&
            commits[commits.length - 1].commit &&
            commits[commits.length - 1].commit.committer.date) ||
          null;
        const mainDetails = isFormatted ? pull : this.formatData(pull);
        const hasReview = Boolean(reviews.length);
        const status = hasReview
          ? reviews.reduce((acc: string, review: any) => {
              if (acc === "APPROVED") {
                return acc;
              }
              return review.state;
            })
          : "NOT YET REVIEW";

        return {
          ...mainDetails,
          lastCommentBy,
          lastCommentAt,
          lastCommitAt,
          hasReview,
          status
        };
      })
      .catch(err => console.error("ERROR:", err));
  };

  render() {
    const { owner, repo } = this.props.match && this.props.match.params;
    const { pulls } = this.props;
    if (!pulls) {
      return <div>ERROR!!</div>;
    }
    return (
      <Container>
        <HeaderContainer>
          <h2>
            <Link to={`/user/${owner}`}>{owner}</Link> / {repo}
          </h2>
          <Tag>
            Total Open PRs: <b>{pulls.length}</b>
          </Tag>
        </HeaderContainer>
        {!pulls.length && <HeaderWarning>There are no Open PRs</HeaderWarning>}
        {pulls.map((pull: PullDetails) => (
          <PullReqView key={pull.prNum} details={pull} />
        ))}
      </Container>
    );
  }
}

const mapStateToProps = (state: any, ownProps: any) => {
  const { owner, repo } = ownProps.match && ownProps.match.params;
  const pulls =
    (state[owner] && state[owner][repo] && state[owner][repo].pulls) || [];
  const alreadyFetchedPulls =
    (state[owner] &&
      state[owner][repo] &&
      state[owner][repo].alreadyFetchedPulls) ||
    false;
  return { pulls, alreadyFetchedPulls };
};

const mapDispatchToProps = {
  addData
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PullReqsView);
