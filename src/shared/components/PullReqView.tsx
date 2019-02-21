import React, {SFC} from 'react';
import styled, { ThemeProvider } from 'styled-components';
import moment from 'moment';

import { formatTime } from '../utils';

// import {PullDetails, PRCommentAndCommit} from '../constants';

const Container = styled.div`
  margin: 5px;
  padding: 15px 5px;
  border: .8px solid #f8f8f8;
  border-radius: 5px;
`

const Avatar = styled.img`
  height: 30px;
  width: 30px;
  border-radius: 50%;
`;

const tagDefault = {
  backgroundColor: '#D8E1E8',
  color: '#202B33',
};

const tagCommented = {
  backgroundColor: '#137CBD',
  color: '#fff',
}

const tagNotYetReview = {
  backgroundColor: '#FFC940',
  color: '#fff',
}

const tagApproved = {
  backgroundColor: '#0F9960',
  color: '#fff',
}

const Tag = styled.span`
  background-color: ${(props: any) => props.theme.backgroundColor};
  border-radius: 5px;
  color: ${(props: any) => props.theme.color};
  padding: 5px 10px;
  margin: 5px;
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`;

type PullReqViewProps = {
  details: any;
  getLastCommentAndCommit: any;
}

const PullReqView: SFC<PullReqViewProps> = ({details, getLastCommentAndCommit}) => {
  const { 
    createdAt,
    hasReview,
    lastCommentAt, 
    lastCommentBy, 
    lastCommitAt,
    lastUpdated,
    prNum,
    reviewers,
    status,
    title,
    user,
    url,
  } = details;
  const createdTimeAgo = moment(createdAt).fromNow();
  const updatedTimeAgo = moment(lastUpdated).fromNow();
  const needReview = !hasReview || !lastCommentAt ? true : lastCommitAt > lastCommentAt;
  console.log(getLastCommentAndCommit)
  const lastCommentTime = lastCommentAt && formatTime(lastCommentAt);
  const lastCommitTime = lastCommitAt && formatTime(lastCommitAt);
  const statusTheme = (status: string) => {
    switch(status.toLowerCase()) {
      case 'commented': 
      return tagCommented;
      case 'approved':
      return tagApproved;
      default:
      return tagNotYetReview;
    }
  }
  return(
    <ThemeProvider theme={tagDefault}>
    <Container>
      <h3><a href={url}>#{prNum}</a>  {title}</h3>
      <TagsContainer>
        <ThemeProvider theme={statusTheme}>
        <h4>STATUS:<Tag>{status}</Tag></h4>
        </ ThemeProvider>
      {needReview && <Tag>NEED REVIEW!</Tag>}
      </TagsContainer>
      <TagsContainer>
      <Tag>Created {createdTimeAgo} by <b>{user}</b></Tag>
      <Tag>Last Update {updatedTimeAgo}</Tag>
      <Tag>Reviewers: {reviewers.length ? reviewers.map((reviewer: any) => <Avatar key={reviewer.avatar} src={reviewer.avatar}/>) : "Not set."}</Tag>
      {lastCommentAt && <Tag>Last comment by {lastCommentBy} at {lastCommentTime}</Tag>}
      <Tag>Last commit at {lastCommitTime}</Tag>
      </TagsContainer>
    </Container>
      </ThemeProvider>
  )
}

export default PullReqView;
