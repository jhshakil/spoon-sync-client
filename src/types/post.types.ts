export type TPost = {
  _id?: string;
  email: string;
  title: string;
  thumbnail: string;
  content: string;
  tags: string[];
  status: TPostStatus;
};
export type TPostStatus = "published" | "draft" | "blocked";
