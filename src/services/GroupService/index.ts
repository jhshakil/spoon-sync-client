"use server";

import { envConfig } from "@/config/envConfig";
import { TGroup } from "@/types/group.type";
import { TUserData } from "@/types/user.types";

export const getAllDisJoinGroup = async (
  email: string
): Promise<{ data: TGroup[] }> => {
  const fetchOption = {
    next: {
      tags: ["dis-joined-group"],
    },
  };

  const res = await fetch(
    `${envConfig.baseUrl}/group/dis-joined/${email}`,
    fetchOption
  );

  if (!res.ok) {
    throw new Error("Failed to get data");
  }

  return res.json();
};

export const getAllJoinGroup = async (
  email: string
): Promise<{ data: TGroup[] }> => {
  const fetchOption = {
    next: {
      tags: ["joined-group"],
    },
  };

  const res = await fetch(
    `${envConfig.baseUrl}/group/joined/${email}`,
    fetchOption
  );

  if (!res.ok) {
    throw new Error("Failed to get data");
  }

  return res.json();
};
