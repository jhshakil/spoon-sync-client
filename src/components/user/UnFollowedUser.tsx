"use client";

import { TUserData } from "@/types/user.types";
import { Separator } from "../ui/separator";
import { UserPlus } from "lucide-react";
import { Button } from "../ui/button";
import { useFollowUser } from "@/hooks/user.hook";
import AvatarComponent from "../shared/AvatarComponent";

type Props = {
  users: TUserData[];
};

const UnFollowedUser = ({ users }: Props) => {
  const { mutate: followingUser } = useFollowUser();

  const followUser = (userId: string) => {
    followingUser({ userId });
  };
  return (
    <div className="bg-background p-4 rounded-lg">
      <h3 className="text-lg font-medium">Who to follow</h3>
      <Separator className="my-3" />
      {users && users.length ? (
        <div className="flex flex-col gap-4">
          {users?.map((user) => (
            <div
              key={user._id}
              className="flex justify-between items-center gap-2"
            >
              <div className="flex gap-3 items-center">
                <AvatarComponent src={user.profileImage} isPro={user?.isPro} />
                <h3>{user.name}</h3>
              </div>
              <Button
                variant={"secondary"}
                size={"icon"}
                onClick={() => followUser(user._id)}
              >
                <UserPlus className="text-primary" />
              </Button>
            </div>
          ))}
        </div>
      ) : (
        <p>No user available</p>
      )}
    </div>
  );
};

export default UnFollowedUser;
