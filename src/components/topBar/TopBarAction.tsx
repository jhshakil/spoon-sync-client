"use client";

import ThemeMode from "./ThemeMode";
import { buttonVariants } from "../ui/button";
import ProfileAction from "./ProfileAction";
import { useUser } from "@/context/user.provider";
import Link from "next/link";
import { cn } from "@/lib/utils";

const TopBarAction = () => {
  const { user } = useUser();

  return (
    <>
      {user?.email ? (
        <>
          <ThemeMode />
          <ProfileAction username={user?.username} role={user?.role} />
        </>
      ) : (
        <>
          <Link href={"/login"} className={cn(buttonVariants())}>
            Login
          </Link>
          <Link
            href={"/registration"}
            className={cn(buttonVariants({ variant: "secondary" }))}
          >
            Registration
          </Link>
          <ThemeMode />
        </>
      )}
    </>
  );
};

export default TopBarAction;
