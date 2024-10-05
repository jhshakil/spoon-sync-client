"use server";

import axiosInstance from "@/lib/axiosInstance";
import { PostSubmitData } from "@/types/post.types";
import { revalidateTag } from "next/cache";

export const createFullPost = async (payload: PostSubmitData): Promise<any> => {
  try {
    const { data } = await axiosInstance.post("/post", payload);

    revalidateTag("posts");

    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to create post");
  }
};
