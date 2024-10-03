"use client";

import ThemeMode from "./ThemeMode";
import { buttonVariants } from "../ui/button";
import ProfileAction from "./ProfileAction";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Props = {
  username: string;
  role: string;
  profileImage: string;
};

const TopBarAction = ({ username, role, profileImage }: Props) => {
  return (
    <>
      {username ? (
        <>
          <ThemeMode />
          <ProfileAction
            username={username}
            role={role}
            profileImage={profileImage}
          />
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
