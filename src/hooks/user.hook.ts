import { updateAdmin, updateUser } from "@/services/UserService";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useUpdateUser = () => {
  return useMutation<any, Error, FormData>({
    mutationKey: ["UPDATE_USER"],
    mutationFn: async (postData) => await updateUser(postData),
    onSuccess: () => {
      toast.success("Update successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useUpdateAdmin = () => {
  return useMutation<any, Error, FormData>({
    mutationKey: ["UPDATE_ADMIN"],
    mutationFn: async (postData) => await updateAdmin(postData),
    onSuccess: () => {
      toast.success("Update successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
