import { createGroup } from "@/services/GroupService";
import { TGroup } from "@/types/group.type";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreateGroup = () => {
  return useMutation<any, Error, TGroup>({
    mutationKey: ["CREATE_GROUP"],
    mutationFn: async (postData) => await createGroup(postData),
    onSuccess: () => {
      toast.success("Group created successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

// export const useGetAllPost = () => {
//   return useMutation<any, Error, { searchTerm: string; email?: string }>({
//     mutationKey: ["GET_ALL_POST"],
//     mutationFn: async (postData) => await getAllPostClient(postData),
//     onSuccess: () => {},
//     onError: (error) => {
//       toast.error(error.message);
//     },
//   });
// };

// export const useUpdatePost = () => {
//   return useMutation<any, Error, Partial<TPost>>({
//     mutationKey: ["UPDATE_POST"],
//     mutationFn: async (postData) => await updatePost(postData),
//     onSuccess: () => {
//       toast.success("Post update successfully");
//     },
//     onError: (error) => {
//       toast.error(error.message);
//     },
//   });
// };
// export const useDeletePost = () => {
//   return useMutation<any, Error, string>({
//     mutationKey: ["DELETE_POST"],
//     mutationFn: async (postData) => await deletePost(postData),
//     onSuccess: () => {
//       toast.success("Post delete successfully");
//     },
//     onError: (error) => {
//       toast.error(error.message);
//     },
//   });
// };
