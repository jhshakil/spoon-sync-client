import DisconnectGroupList from "@/components/group/DisconnectGroupList";
import GroupBanner from "@/components/group/GroupBanner";
import AllPostCard from "@/components/post/AllPostCard";
import ProfileAbout from "@/components/profile/ProfileAbout";
import ProfileBanner from "@/components/profile/ProfileBanner";
import { ScrollArea } from "@/components/ui/scroll-area";
import AllFollowedUser from "@/components/user/AllFollowedUser";
import { getCurrentUser } from "@/services/AuthService";
import {
  getAllDisJoinGroup,
  getAllGroupPost,
  getGroupById,
} from "@/services/GroupService";
import { getUserPost } from "@/services/PostService";
import { getAllFollow, getUser } from "@/services/UserService";

type Props = {
  params: {
    id: string;
  };
};

const Page = async ({ params }: Props) => {
  const { id } = params;

  const user = await getCurrentUser();

  const { data: userData } = await getUser(user?.email as string);

  const { data: posts } = await getAllGroupPost({ groupId: id });
  const { data: group } = await getGroupById(id);
  const { data: disJoinGroup } = await getAllDisJoinGroup(
    user?.email as string
  );

  if (!user) return null;

  // Fetch all followed users
  //   const { data: allFollowUser } = await getAllFollow(user?.email as string);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 justify-between">
      <ScrollArea className="col-span-2 h-[calc(100vh-95px)]">
        <div className="flex flex-col gap-4">
          <GroupBanner group={group} userData={userData} />
          <div className="lg:hidden">
            <div className="p-4 bg-background rounded-lg">
              <div>
                <h2 className="text-xl">About</h2>
                <p className="min-h-[60px] mt-4">{group?.description}</p>
              </div>
            </div>
            {/* <AllFollowedUser users={allFollowUser} /> */}
            <DisconnectGroupList groups={disJoinGroup} userData={userData} />
          </div>
          <AllPostCard posts={posts} />
        </div>
      </ScrollArea>
      <ScrollArea className="h-[calc(100vh-95px)] hidden lg:block">
        <div className="p-4 bg-background rounded-lg">
          <div>
            <h2 className="text-xl">About</h2>
            <p className="min-h-[60px] mt-4">{group?.description}</p>
          </div>
        </div>
        <DisconnectGroupList groups={disJoinGroup} userData={userData} />
      </ScrollArea>
    </div>
  );
};

export default Page;
