import { createGroup, joinGroup, updateGroup } from "@/services/GroupService";
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

export const useJoinGroup = () => {
  return useMutation<any, Error, { email: string; groupId: string }>({
    mutationKey: ["JOIN_GROUP"],
    mutationFn: async (postData) => await joinGroup(postData),
    onSuccess: () => {
      toast.success("Group join successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useLeaveGroup = () => {
  return useMutation<any, Error, { email: string; groupId: string }>({
    mutationKey: ["LEAVE_GROUP"],
    mutationFn: async (postData) => await joinGroup(postData),
    onSuccess: () => {
      toast.success("Group leave successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
