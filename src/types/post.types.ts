export type TPost = {
  _id?: string;
  email: string;
  title: string;
  thumbnail: string;
  content: string;
  tags: TTag[];
  status: TPostStatus;
  totalUpVote?: string;
  totalDownVote?: string;
  totalComment?: string;
  averageRatting?: string;
  action?: TPostAction[];
  comment?: TPostComment[];
  ratting?: TPostRatting[];
  createdAt?: string;
};

export type TTag = {
  id: string;
  text: string;
};

export type TPostAction = {
  type: string;
  authId: string;
};

export type TPostComment = {
  text: string;
  authId: string;
};

export type TPostRatting = {
  count: string;
  authId: string;
};
export type TPostStatus = "published" | "draft" | "blocked";
