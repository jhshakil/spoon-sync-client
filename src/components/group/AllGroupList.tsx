"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TGroup } from "@/types/group.type";
import GroupCard from "./GroupCard";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import CreateGroupDialog from "./CreateGroupDialog";
import {
  useCreateGroup,
  useJoinGroup,
  useLeaveGroup,
} from "@/hooks/group.hook";

type Props = {
  disJoinGroup: TGroup[];
  joinGroup: TGroup[];
  userEmail: string;
};

const AllGroupList = ({ joinGroup, disJoinGroup, userEmail }: Props) => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const { mutate: handleGroupCreate } = useCreateGroup();
  const { mutate: handleGroupJoin } = useJoinGroup();
  const { mutate: handleGroupLeave } = useLeaveGroup();

  const handleJoinGroup = (groupId: string, status: string) => {
    if (status === "join") {
      handleGroupLeave({ email: userEmail, groupId });
    } else {
      handleGroupJoin({ email: userEmail, groupId });
    }
  };

  const handleCreateGroup = (values: any) => {
    handleGroupCreate(values);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Groups</h1>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Create Group
        </Button>
      </div>
      <Tabs defaultValue="discover" className="w-full mb-8">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="joined">Joined</TabsTrigger>
          <TabsTrigger value="discover">Discover</TabsTrigger>
        </TabsList>

        <TabsContent value="joined">
          {joinGroup?.length > 0 ? (
            <GroupCard
              groups={joinGroup}
              onJoinGroup={handleJoinGroup}
              isJoined={true}
              userEmail={userEmail}
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
          {disJoinGroup?.length > 0 ? (
            <GroupCard
              groups={disJoinGroup}
              onJoinGroup={handleJoinGroup}
              isJoined={false}
              userEmail={userEmail}
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
      <CreateGroupDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onSubmit={handleCreateGroup}
      />
    </div>
  );
};

export default AllGroupList;
