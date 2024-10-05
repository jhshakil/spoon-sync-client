import AllPostCard from "@/components/post/AllPostCard";
import ProfileAbout from "@/components/profile/ProfileAbout";
import ProfileBanner from "@/components/profile/ProfileBanner";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getCurrentUser } from "@/services/AuthService";
import { getUserPost } from "@/services/PostService";
import { getUser } from "@/services/UserService";

const Page = async () => {
  const user = await getCurrentUser();

  const { data: userData } = await getUser(user?.email as string);

  // const posts = [];
  const { data: posts } = await getUserPost();

  return (
    <div className="grid grid-cols-3 gap-4 justify-between">
      <ScrollArea className="col-span-2 h-[90vh] px-3">
        <div className="flex flex-col gap-6">
          <ProfileBanner user={userData} />
          <AllPostCard posts={posts} />
        </div>
      </ScrollArea>
      <ScrollArea className="h-[90vh] px-3">
        <ProfileAbout userData={userData} />
      </ScrollArea>
    </div>
  );
};

export default Page;
