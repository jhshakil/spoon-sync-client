import { useMutation } from "@tanstack/react-query";
import {
  loginUser,
  registerAdmin,
  registerUser,
} from "../services/AuthService";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

export const useUserRegistration = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["USER_REGISTRATION"],
    mutationFn: async (userData) => await registerUser(userData),
    onSuccess: () => {
      toast.success("User registration successful");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useAdminRegistration = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["ADMIN_REGISTRATION"],
    mutationFn: async (userData) => await registerAdmin(userData),
    onSuccess: () => {
      toast.success("Admin registration successful");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useUserLogin = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["USER_Login"],
    mutationFn: async (userData) => await loginUser(userData),
    onSuccess: () => {
      toast.success("User login successful");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
