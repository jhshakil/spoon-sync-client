"use server";

import { envConfig } from "@/config/envConfig";
import axiosInstance from "@/lib/axiosInstance";
import { revalidateTag } from "next/cache";
import { getCurrentUser } from "../AuthService";
import { TUserData } from "@/types/user.types";

export const getUser = async (email: string): Promise<{ data: TUserData }> => {
  const fetchOption = {
    next: {
      tags: ["user"],
    },
  };

  const res = await fetch(`${envConfig.baseUrl}/user/${email}`, fetchOption);

  if (!res.ok) {
    throw new Error("Failed to get data");
  }

  return res.json();
};

export const updateUser = async (formData: FormData): Promise<any> => {
  const user = await getCurrentUser();

  try {
    const { data } = await axiosInstance.patch(
      `/user/${user?.email}`,
      formData
    );

    revalidateTag("user");

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};
