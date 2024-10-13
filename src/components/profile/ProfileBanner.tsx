"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "../ui/button";
import { TUserData } from "@/types/user.types";
import { Crown, EllipsisVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import AvatarComponent from "../shared/AvatarComponent";
import { useFollowUser, useUnFollowUser } from "@/hooks/user.hook";

type Props = {
  user: TUserData;
  edit?: boolean;
  isFollower?: boolean;
};

const ProfileBanner = ({ user, edit = true, isFollower = false }: Props) => {
  const { mutate: followingUser } = useFollowUser();
  const { mutate: unFollowingUser } = useUnFollowUser();

  const followUser = (userId: string) => {
    followingUser({ userId });
  };

  const unFollowUser = (userId: string) => {
    unFollowingUser({ userId });
  };

  return (
    <div className="bg-background p-4 rounded-lg">
      <div className="flex flex-wrap md:flex-nowrap justify-between gap-11">
        <div className="flex items-center gap-4">
          <AvatarComponent
            src={user?.profileImage}
            className="w-[100px] h-[100px]"
            isPro={user?.isPro}
            fallback={user?.name[0]}
            badgeClassName="w-4 h-4"
          />
          <div>
            <h1 className="text-2xl font-medium">{user.name}</h1>
            <p className="text-sm">
              <span className="text-primary">
                {user?.follower?.length || 0}
              </span>{" "}
              followers |{" "}
              <span className="text-primary">
                {user?.following?.length || 0}
              </span>{" "}
              following
            </p>
            <div className="flex gap-4 items-center">
              {edit ? (
                user?.isPro ? (
                  ""
                ) : (
                  <Link
                    href={`/user/profile/upgrade-pro`}
                    className={cn(
                      buttonVariants({ variant: "outline", size: "sm" }),
                      "mt-2 px-5"
                    )}
                  >
                    <Crown className="mr-2 text-primary w-4 h-4" /> Upgrade to
                    Pro
                  </Link>
                )
              ) : isFollower ? (
                <>
                  <Button
                    variant={"outline"}
                    size={"sm"}
                    className="mt-2 px-5"
                    onClick={() => unFollowUser(user?._id)}
                  >
                    UnFollow
                  </Button>
                </>
              ) : (
                <Button
                  size={"sm"}
                  className="mt-2 px-5"
                  onClick={() => followUser(user?._id)}
                >
                  Follow
                </Button>
              )}
            </div>
          </div>
        </div>
        {edit ? (
          <div className="flex justify-end items-top gap-3 w-full md:w-auto">
            <Link
              href={"/user/profile/create-post"}
              className={cn(buttonVariants())}
            >
              Create Post
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant={"secondary"} size={"icon"}>
                  <EllipsisVertical />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="min-w-[90px]">
                <DropdownMenuItem asChild>
                  <Link href={`/user/profile/edit`}>Edit Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href={`/forget-password`}>Change Password</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default ProfileBanner;
