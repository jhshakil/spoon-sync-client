import AllPostCard from "@/components/post/AllPostCard";
import ProfileAbout from "@/components/profile/ProfileAbout";
import ProfileBanner from "@/components/profile/ProfileBanner";
import { ScrollArea } from "@/components/ui/scroll-area";
import AllFollowedUser from "@/components/user/AllFollowedUser";
import { getCurrentUser } from "@/services/AuthService";
import { getUserPost } from "@/services/PostService";
import { getAllFollow, getUser } from "@/services/UserService";

const Page = async () => {
  const user = await getCurrentUser();

  const { data: userData } = await getUser(user?.email as string);

  const { data: posts } = await getUserPost(user?.email as string);

  if (!user) return null;
  const { data: allFollowUser } = await getAllFollow(user?.email as string);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 justify-between">
      <ScrollArea className="col-span-2 h-[calc(100vh-95px)]">
        <div className="flex flex-col gap-4">
          <ProfileBanner user={userData} />
          <div className="lg:hidden">
            <ProfileAbout userData={userData} />
            <AllFollowedUser users={allFollowUser} />
          </div>
          <AllPostCard posts={posts} />
        </div>
      </ScrollArea>
      <ScrollArea className="h-[calc(100vh-95px)] hidden lg:block">
        <ProfileAbout userData={userData} />
        <AllFollowedUser users={allFollowUser} />
      </ScrollArea>
    </div>
  );
};

export default Page;
