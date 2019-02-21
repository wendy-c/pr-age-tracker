export const baseUrl = 'https://api.github.com';

export type PullDetails = {
  title: string;
  user: string;
  prNum: number;
  url: string;
  state: string;
  createdAt: string;
  lastUpdated: string;
  reviewers: string[];
  hasReview: boolean;
  lastCommentBy: string;
  lastCommentAt: string;
  lastCommitAt: string;
  status: string;
}

export type Action = {
  type: string;
  payload: any;
}