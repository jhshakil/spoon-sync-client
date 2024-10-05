import { createFullPost } from "@/services/PostService";
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
