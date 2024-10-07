export type TUser = {
  email: string;
  username: string;
  role: string;
  isBlocked?: boolean;
};

export type TUserData = {
  _id: string;
  authId?: TUser;
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

export type TAdminData = {
  _id: string;
  authId?: TUser;
  email: string;
  name: string;
  profileImage: string;
  phoneNumber: string;
};
