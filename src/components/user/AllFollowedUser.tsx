"use client";

import { TUserData } from "@/types/user.types";
import { Separator } from "../ui/separator";
import { UserMinus } from "lucide-react";
import { Button } from "../ui/button";
import { useUnFollowUser } from "@/hooks/user.hook";
import AvatarComponent from "../shared/AvatarComponent";
import Link from "next/link";

type Props = {
  users: TUserData[];
};

const AllFollowedUser = ({ users }: Props) => {
  const { mutate: followingUser } = useUnFollowUser();

  const followUser = (userId: string) => {
    followingUser({ userId });
  };
  return (
    <div className="bg-background p-4 rounded-lg mt-4">
      <h3 className="text-lg font-medium">You are following</h3>
      <Separator className="my-3" />
      {users && users.length ? (
        <div className="flex flex-col gap-4">
          {users?.map((user) => (
            <div
              key={user._id}
              className="flex justify-between items-center gap-2"
            >
              <Link href={`/user/${user.email}`}>
                <div className="flex gap-3 items-center">
                  <AvatarComponent
                    src={user.profileImage}
                    isPro={user?.isPro}
                  />
                  <h3>{user.name}</h3>
                </div>
              </Link>
              <Button
                variant={"secondary"}
                size={"icon"}
                onClick={() => followUser(user._id)}
              >
                <UserMinus className="text-primary" />
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

export default AllFollowedUser;
