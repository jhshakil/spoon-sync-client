import { TUserData } from "./user.types";

export type TGroup = {
  _id?: string;
  name: string;
  description: string;
  admins: TUserData[];
  members: TUserData[];
  logo: string;
  banner: string;
  isDeleted: boolean;
  status: TGroupStatus;
};

export type TGroupStatus = "active" | "disabled" | "blocked";
