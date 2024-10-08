import {
  deleteAdmin,
  deleteUser,
  updateAdmin,
  updateAdminStatus,
  updateUser,
  updateUserStatus,
} from "@/services/UserService";
import { TUser } from "@/types/user.types";
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

export const useUpdateStatus = () => {
  return useMutation<any, Error, Partial<TUser>>({
    mutationKey: ["UPDATE_USER_STATUS"],
    mutationFn: async (postData) => await updateUserStatus(postData),
    onSuccess: () => {
      toast.success("Update successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useDeleteUser = () => {
  return useMutation<any, Error, string>({
    mutationKey: ["DELETE_USER"],
    mutationFn: async (postData) => await deleteUser(postData),
    onSuccess: () => {
      toast.success("User delete successfully");
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

export const useUpdateAdminStatus = () => {
  return useMutation<any, Error, Partial<TUser>>({
    mutationKey: ["UPDATE_ADMIN_STATUS"],
    mutationFn: async (postData) => await updateAdminStatus(postData),
    onSuccess: () => {
      toast.success("Update successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useDeleteAdmin = () => {
  return useMutation<any, Error, string>({
    mutationKey: ["DELETE_ADMIN"],
    mutationFn: async (postData) => await deleteAdmin(postData),
    onSuccess: () => {
      toast.success("Admin delete successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
