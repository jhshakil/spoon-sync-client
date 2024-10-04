import ProfileAbout from "@/components/profile/ProfileAbout";
import ProfileBanner from "@/components/profile/ProfileBanner";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getCurrentUser } from "@/services/AuthService";
import { getUser } from "@/services/UserService";

const Page = async () => {
  const user = await getCurrentUser();

  const { data: userData } = await getUser(user?.email as string);

  return (
    <div className="grid grid-cols-3 gap-4 justify-between">
      <ScrollArea className="col-span-2 h-[90vh] px-3">
        <ProfileBanner user={userData} />
      </ScrollArea>
      <ScrollArea className="h-[90vh] px-3">
        <ProfileAbout userData={userData} />
      </ScrollArea>
    </div>
  );
};

export default Page;
