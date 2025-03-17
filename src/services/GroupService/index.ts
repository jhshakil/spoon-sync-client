"use server";

import { envConfig } from "@/config/envConfig";
import axiosInstance from "@/lib/axiosInstance";
import { TGroup } from "@/types/group.type";
import { revalidateTag } from "next/cache";
import { toast } from "sonner";

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
    toast("Failed to get data");
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
    toast("Failed to get data");
  }

  return res.json();
};

export const createGroup = async (payload: TGroup): Promise<any> => {
  try {
    const { data } = await axiosInstance.post("/group", payload);

    revalidateTag("groups");

    return data;
  } catch (error) {
    console.log(error);
    toast("Failed to create group");
  }
};
