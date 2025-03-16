import AllPostCard from "@/components/post/AllPostCard";
import ProfileAbout from "@/components/profile/ProfileAbout";
import ProfileBanner from "@/components/profile/ProfileBanner";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getCurrentUser } from "@/services/AuthService";
import { getUserPost } from "@/services/PostService";
import { getAllFollow, getUser } from "@/services/UserService";

type Props = {
  params: {
    id: string;
  };
};

const Page = async ({ params: { id } }: Props) => {
  if (!id) return;
  const userEmail = id.split("%40").join("@");
  const user = await getCurrentUser();
  const { data: userData } = await getUser(userEmail);

  const { data: posts } = await getUserPost(userEmail);
  const { data: followUser } = await getAllFollow(user?.email as string);

  const isFollower = followUser?.find((el) => el.email === userEmail);

  return (
    <div className="grid grid-cols-3 gap-4 justify-between">
      <ScrollArea className="col-span-2 h-[calc(100vh-95px)] px-3">
        <div className="flex flex-col gap-6">
          <ProfileBanner
            user={userData}
            edit={false}
            isFollower={isFollower?.email ? true : false}
          />
          <AllPostCard posts={posts} />
        </div>
      </ScrollArea>
      <ScrollArea className="h-[calc(100vh-95px)] px-3">
        <ProfileAbout userData={userData} />
      </ScrollArea>
    </div>
  );
};

export default Page;
