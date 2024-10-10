export type TUser = {
  _id?: string;
  email: string;
  username: string;
  role: string;
  status?: TUserStatus;
};

export type TUserStatus = "active" | "inActive" | "blocked";

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
