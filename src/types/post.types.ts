export type TPost = {
  _id?: string;
  email: string;
  title: string;
  thumbnail: string;
  content: string;
  tags: TTag[];
  status: TPostStatus;
};

export type TTag = {
  id: string;
  text: string;
};
export type TPostStatus = "published" | "draft" | "blocked";
