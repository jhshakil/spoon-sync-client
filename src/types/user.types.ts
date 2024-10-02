export type TUser = {
  email: string;
  username: string;
  role: string;
  iat: number;
  exp: number;
};

export type TUserData = {
  _id: string;
  email: string;
  role: string;
  name: string;
  phone: string;
  address: string;
};
