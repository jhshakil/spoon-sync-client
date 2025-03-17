"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TGroup } from "@/types/group.type";
import GroupCard from "./GroupCard";
import { TUserData } from "@/types/user.types";

type Props = {
  disJoinGroup: TGroup[];
  joinGroup: TGroup[];
  userData: TUserData;
};

const AllGroupList = ({ joinGroup, disJoinGroup, userData }: Props) => {
  const handleJoinGroup = (groupId: string) => {
    console.log(groupId);
  };

  return (
    <Tabs defaultValue="discover" className="w-full mb-8">
      <TabsList className="grid w-full grid-cols-2 mb-6">
        <TabsTrigger value="joined">Joined</TabsTrigger>
        <TabsTrigger value="discover">Discover</TabsTrigger>
      </TabsList>

      <TabsContent value="joined">
        {joinGroup.length > 0 ? (
          <GroupCard
            groups={joinGroup}
            onJoinGroup={handleJoinGroup}
            userId={userData._id}
          />
        ) : (
          <div className="text-center py-12 bg-muted/30 rounded-lg">
            <p className="text-muted-foreground">
              You have not joined any groups yet.
            </p>
          </div>
        )}
      </TabsContent>

      <TabsContent value="discover">
        {disJoinGroup.length > 0 ? (
          <GroupCard
            groups={disJoinGroup}
            onJoinGroup={handleJoinGroup}
            userId={userData._id}
          />
        ) : (
          <div className="text-center py-12 bg-muted/30 rounded-lg">
            <p className="text-muted-foreground">
              No new groups to discover at the moment.
            </p>
          </div>
        )}
      </TabsContent>
    </Tabs>
  );
};

export default AllGroupList;
