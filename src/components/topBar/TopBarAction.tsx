"use client";

import ThemeMode from "./ThemeMode";
import { buttonVariants } from "../ui/button";
import ProfileAction from "./ProfileAction";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { TUserData } from "@/types/user.types";

type Props = {
  username: string;
  role: string;
  userData: TUserData;
};

const TopBarAction = ({ username, role, userData }: Props) => {
  return (
    <>
      {username ? (
        <>
          <ThemeMode />
          <ProfileAction username={username} role={role} userData={userData} />
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
