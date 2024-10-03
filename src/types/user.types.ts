export type TUser = {
  email: string;
  username: string;
  role: string;
};

export type TUserData = {
  _id: string;
  authId: string;
  email: string;
  name: string;
  bio: string;
  profileImage: string;
  phoneNumber: string;
  gender: "male" | "female";
  dateOfBirth: string;
  isPro: string;
  following: string;
  follower: string;
};
