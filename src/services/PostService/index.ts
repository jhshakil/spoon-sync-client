"use server";

import { envConfig } from "@/config/envConfig";
import axiosInstance from "@/lib/axiosInstance";
import { TPost } from "@/types/post.types";
import { revalidateTag } from "next/cache";
import { getCurrentUser } from "../AuthService";

export const createFullPost = async (payload: TPost): Promise<any> => {
  try {
    const { data } = await axiosInstance.post("/post", payload);

    revalidateTag("posts");

    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to create post");
  }
};

export const getAllPost = async () => {
  const fetchOption = {
    next: {
      tags: ["posts"],
    },
  };

  const res = await fetch(`${envConfig.baseUrl}/post`, fetchOption);

  return res.json();
};

export const getUserPost = async () => {
  const user = await getCurrentUser();
  const fetchOption = {
    next: {
      tags: ["posts"],
    },
  };

  const res = await fetch(
    `${envConfig.baseUrl}/post/${user?.email}`,
    fetchOption
  );

  return res.json();
};

export const getSinglePost = async (id: string) => {
  const fetchOption = {
    next: {
      tags: ["posts"],
    },
  };

  const res = await fetch(
    `${envConfig.baseUrl}/post/single/${id}`,
    fetchOption
  );

  return res.json();
};
