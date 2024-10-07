import { createFullPost, deletePost, updatePost } from "@/services/PostService";
import { TPost } from "@/types/post.types";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreatePost = () => {
  return useMutation<any, Error, TPost>({
    mutationKey: ["CREATE_POST"],
    mutationFn: async (postData) => await createFullPost(postData),
    onSuccess: () => {
      toast.success("Post created successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useUpdatePost = () => {
  return useMutation<any, Error, Partial<TPost>>({
    mutationKey: ["UPDATE_POST"],
    mutationFn: async (postData) => await updatePost(postData),
    onSuccess: () => {
      toast.success("Post update successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
export const useDeletePost = () => {
  return useMutation<any, Error, string>({
    mutationKey: ["DELETE_POST"],
    mutationFn: async (postData) => await deletePost(postData),
    onSuccess: () => {
      toast.success("Post delete successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
