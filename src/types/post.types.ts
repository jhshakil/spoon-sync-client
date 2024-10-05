export type TPost = {
  _id?: string;
  email: string;
  title: string;
  thumbnail: string;
  content: string;
  tags: string[];
  isPublished: boolean;
  isBlocked?: boolean;
};
