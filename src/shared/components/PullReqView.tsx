import React, {SFC} from 'react';
import styled from 'styled-components';
import moment from 'moment';

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

type PullReqViewProps = {
  details: any;
  getLastCommentAndCommit: any;
}

const PullReqView: SFC<PullReqViewProps> = ({details, getLastCommentAndCommit}) => {
  const createdTimeAgo = moment(details.createdAt).fromNow();
  const updatedTimeAgo = moment(details.lastUpdated).fromNow();
  console.log(getLastCommentAndCommit)
  return(
    <Container>
      <h3><a href={details.url}>#{details.prNumber}</a>{details.title}</h3>
      <span>Created {createdTimeAgo} by {details.user}</span>
      <span>Last {updatedTimeAgo}</span>
      <span>Reviewers: {details.reviewers.map((reviewer: any) => <Avatar key={reviewer.avatar} src={reviewer.avatar}/>)}</span>
    </Container>
  )
}

export default PullReqView;
