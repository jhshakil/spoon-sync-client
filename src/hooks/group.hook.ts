import { createGroup, updateGroup } from "@/services/GroupService";
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

export const useUpdateGroup = () => {
  return useMutation<any, Error, Partial<TGroup>>({
    mutationKey: ["UPDATE_GROUP"],
    mutationFn: async (postData) => await updateGroup(postData),
    onSuccess: () => {
      toast.success("Group update successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
