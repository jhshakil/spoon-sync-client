"use client";

import { Toaster } from "@/components/ui/toaster";
import UserProvider from "@/context/user.provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";

const queryClient = new QueryClient();

const Providers = ({ children, ...props }: ThemeProviderProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <Toaster />
        <NextThemesProvider {...props}>{children}</NextThemesProvider>
      </UserProvider>
    </QueryClientProvider>
  );
};

export default Providers;
