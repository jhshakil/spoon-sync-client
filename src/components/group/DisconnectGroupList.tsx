"use client";

import { Separator } from "../ui/separator";
import { UserPlus } from "lucide-react";
import { Button } from "../ui/button";
import AvatarComponent from "../shared/AvatarComponent";
import Link from "next/link";
import { TGroup } from "@/types/group.type";
import { useJoinGroup } from "@/hooks/group.hook";
import { TUserData } from "@/types/user.types";

type Props = {
  groups: TGroup[];
  userData: TUserData;
};

const DisconnectGroupList = ({ groups, userData }: Props) => {
  const { mutate: handleGroupJoin } = useJoinGroup();

  const joinGroup = (groupId: string) => {
    handleGroupJoin({ email: userData.email, groupId });
  };
  return (
    <div className="bg-background p-4 rounded-lg mt-4">
      <h3 className="text-lg font-medium">More Smiler Group</h3>
      <Separator className="my-3" />
      {groups && groups.length ? (
        <div className="flex flex-col gap-4">
          {groups?.map((group) => (
            <div
              key={group._id}
              className="flex justify-between items-center gap-2"
            >
              <div className="flex gap-3">
                <AvatarComponent src={group.logo} className="h-12 w-12" />
                <div>
                  <Link href={`/group/${group._id}`}>
                    <h3>{group.name}</h3>
                  </Link>
                  <span className="text-xs">
                    {group.members.length} members
                  </span>
                </div>
              </div>
              <Button
                variant={"secondary"}
                size={"icon"}
                onClick={() => joinGroup(group._id as string)}
              >
                <UserPlus className="text-primary" />
              </Button>
            </div>
          ))}
        </div>
      ) : (
        <p>No group available</p>
      )}
    </div>
  );
};

export default DisconnectGroupList;
