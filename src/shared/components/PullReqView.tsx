import React, { SFC } from "react";
import styled, { ThemeProvider } from "styled-components";
import moment from "moment";

import { formatTime } from "../utils";
import {
  tagWarning,
  tagNeutral,
  tagDefault,
  tagAttention,
  tagGoodStanding
} from "../themes";

import { PullDetails } from "../constants";

const Container = styled.div`
  margin: 5px;
  padding: 15px;
  border: 0.8px solid #d8e1e8;
  border-radius: 5px;
`;

const Avatar = styled.img`
  height: 30px;
  width: 30px;
  border-radius: 50%;
`;

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
  details: PullDetails;
};

const PullReqView: SFC<PullReqViewProps> = ({ details }) => {
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
    url
  } = details;
  const createdTimeAgo = moment(createdAt).fromNow();
  const updatedTimeAgo = lastUpdated && formatTime(lastUpdated);
  const needReview =
    !hasReview || !lastCommentAt ? true : lastCommitAt > lastCommentAt;
  const lastCommentTime = lastCommentAt && formatTime(lastCommentAt);
  const lastCommitTime = lastCommitAt && formatTime(lastCommitAt);
  const statusTheme = ((status: string) => {
    switch (status.toLowerCase()) {
      case "commented":
        return tagNeutral;
      case "approved":
        return tagGoodStanding;
      default:
        return tagWarning;
    }
  })(status || "");
  return (
    <ThemeProvider theme={tagDefault}>
      <Container>
        <h3>
          <a href={url}>#{prNum}</a> {title}
        </h3>
        <TagsContainer>
          <h4>
            <ThemeProvider theme={statusTheme}>
              <span>
                STATUS:<Tag>{status}</Tag>
              </span>
            </ThemeProvider>
            {needReview && (
              <ThemeProvider theme={tagAttention}>
                <Tag>NEED REVIEW!</Tag>
              </ThemeProvider>
            )}
          </h4>
        </TagsContainer>
        <TagsContainer>
          <Tag>
            Created {createdTimeAgo} by <b>{user}</b>
          </Tag>
          <Tag>
            Last Update <b>{updatedTimeAgo}</b>
          </Tag>
          <Tag>
            Reviewers{" "}
            <b>
              {reviewers && reviewers.length
                ? reviewers.map((reviewer: any) => (
                    <Avatar key={reviewer.avatar} src={reviewer.avatar} />
                  ))
                : "Not set."}
            </b>
          </Tag>
          {lastCommentAt && (
            <Tag>
              Last comment by <b>{lastCommentBy}</b> at <b>{lastCommentTime}</b>
            </Tag>
          )}
          <Tag>
            Last commit at <b>{lastCommitTime}</b>
          </Tag>
        </TagsContainer>
      </Container>
    </ThemeProvider>
  );
};

export default PullReqView;
