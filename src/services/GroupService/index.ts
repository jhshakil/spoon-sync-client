"use server";

import { envConfig } from "@/config/envConfig";
import axiosInstance from "@/lib/axiosInstance";
import { TGroup } from "@/types/group.type";
import { revalidateTag } from "next/cache";
import { toast } from "sonner";

export const getAllDisJoinGroup = async (email: string): Promise<any> => {
  try {
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
      console.log("Failed to get data");
    }

    return res.json();
  } catch (error) {
    console.log("Failed to get data");
  }
};

export const getAllJoinGroup = async (email: string): Promise<any> => {
  try {
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
      console.log("Failed to get data");
    }

    return res.json();
  } catch (error) {
    console.log("Failed to get data");
  }
};

export const getGroupById = async (groupId: string): Promise<any> => {
  try {
    const fetchOption = {
      next: {
        tags: ["group-by-id"],
      },
    };

    const res = await fetch(
      `${envConfig.baseUrl}/group/${groupId}`,
      fetchOption
    );

    if (!res.ok) {
      console.log("Failed to get data");
    }

    return res.json();
  } catch (error) {
    console.log("Failed to get data");
  }
};

export const createGroup = async (payload: TGroup): Promise<any> => {
  try {
    const { data } = await axiosInstance.post("/group", payload);

    revalidateTag("groups");

    return data;
  } catch (error) {
    console.log(error);
    console.log("Failed to create group");
  }
};

export const getAllGroupPost = async ({
  groupId,
}: {
  groupId?: string;
}): Promise<any> => {
  try {
    const fetchOption = {
      next: {
        tags: ["posts"],
      },
    };

    const url = new URL(`${envConfig.baseUrl}/post/group/${groupId}`);

    const res = await fetch(url.toString(), fetchOption);

    return res.json();
  } catch (error: any) {
    throw new Error("Failed to get post");
  }
};
