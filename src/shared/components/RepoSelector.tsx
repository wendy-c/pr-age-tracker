import React, { SFC } from "react";
import styled, { ThemeProvider } from "styled-components";
import { Link } from "react-router-dom";

import { tagGoodStanding, tagAttention } from "../themes";

const Container = styled.div`
  margin: 5px;
  padding: 0 10px;
  border: 0.8px solid #d8e1e8;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Tag = styled.span`
  background-color: ${(props: any) => props.theme.backgroundColor};
  color: #fff;
  padding: 5px;
  border-radius: 5px;
`;

type RepoSelectorProps = {
  repoName: string;
  prTotal: number;
  user: string;
};

const RepoSelector: SFC<RepoSelectorProps> = ({ repoName, prTotal, user }) => {
  const theme = prTotal < 10 ? tagGoodStanding : tagAttention;
  return (
    <Container>
      <h3>
        <Link to={`/repo/${user}/${repoName}`}>{repoName}</Link>
      </h3>
      <ThemeProvider theme={theme}>
        <Tag>Open PRs: {prTotal}</Tag>
      </ThemeProvider>
    </Container>
  );
};

export default RepoSelector;
