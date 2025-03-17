"use client";

import { TUserData } from "@/types/user.types";
import Image from "next/image";
import { Badge } from "../ui/badge";
import Link from "next/link";
import { UserPlus, Users } from "lucide-react";
import { useFollowUser } from "@/hooks/user.hook";
import { Button } from "../ui/button";

type Props = {
  users: TUserData[];
};

const AllUserCardList = ({ users }: Props) => {
  const { mutate: followingUser } = useFollowUser();

  const followUser = (userId: string) => {
    followingUser({ userId });
  };
  return (
    <div className="grid gap-6 md:grid-cols-2 2xl:grid-cols-3">
      {users?.map((user) => (
        <div
          key={user._id}
          className="group flex flex-col items-center border border-border rounded-lg p-4"
        >
          <div className="relative mb-3">
            <div className="relative h-24 w-24 overflow-hidden rounded-full ring-2 ring-background">
              <Image
                src={user.profileImage || "/placeholder.svg"}
                alt={user.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 96px, 96px"
              />
            </div>
            {user.isPro && (
              <Badge className="absolute -right-1 bottom-1 bg-gradient-to-r from-orange-400 to-orange-500 px-2 py-0.5 text-[10px] font-semibold text-white">
                PRO
              </Badge>
            )}
          </div>
          <div className="flex w-full items-center justify-center gap-2 px-2">
            <Link
              href={`/user/${user.email}`}
              className="group-hover:underline"
            >
              <h3 className="font-medium text-center">{user.name}</h3>
            </Link>
          </div>
          <div className="flex w-full items-center justify-between gap-2">
            <div className="mt-1 flex w-full items-center gap-2 px-2 text-xs text-muted-foreground">
              <Users className="h-3 w-3" />
              <span>{user.totalFollower} followers</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full hover:bg-orange-50"
              onClick={() => followUser(user._id)}
            >
              <UserPlus className="h-4 w-4 text-orange-500" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllUserCardList;
