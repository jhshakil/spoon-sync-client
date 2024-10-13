import AllPostCard from "@/components/post/AllPostCard";
import ProfileAbout from "@/components/profile/ProfileAbout";
import ProfileBanner from "@/components/profile/ProfileBanner";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getCurrentUser } from "@/services/AuthService";
import { getUserPost } from "@/services/PostService";
import { getUser } from "@/services/UserService";

type Props = {
  params: {
    id: string;
  };
};

const Page = async ({ params: { id } }: Props) => {
  if (!id) return;
  const { data: userData } = await getUser(id);

  const { data: posts } = await getUserPost(id);

  return (
    <div className="grid grid-cols-3 gap-4 justify-between">
      <ScrollArea className="col-span-2 h-[90vh] px-3">
        <div className="flex flex-col gap-6">
          <ProfileBanner user={userData} edit={false} />
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
