import React, { SFC } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Container = styled.div`
  margin: 5px;
  padding: 0 10px;
  border: .8px solid #D8E1E8;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Tag = styled.span`
  color: #202B33;
  border: .8px solid #202B33;
  padding: 5px;
  border-radius: 5px;
`;

type RepoSelectorProps = {
  repoName: string;
  prTotal: number;
  user: string;
}

const RepoSelector: SFC<RepoSelectorProps> = ({repoName, prTotal, user}) => 
<Container>
<h3><Link to={`/repo/${user}/${repoName}`}>{repoName}</Link></h3> 
<Tag>Open PRs: {prTotal}</Tag>
</Container>


export default RepoSelector;