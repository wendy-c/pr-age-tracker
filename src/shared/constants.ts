export const baseUrl = 'https://api.github.com';

export type PullDetails = {
  title: string;
  user: string;
  prNumber: number;
  url: string;
  state: string;
  createdAt: string;
  lastUpdated: string;
  reviewers: string[];
}

export type PRCommentAndCommit = {
  lastCommentBy: string;
  lastCommentAt: string;
  lastCommitBy: string;
  lastCommitAt: string;
}

export type Action = {
  type: string;
  payload: any;
}