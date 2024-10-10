import UnFollowedUser from "@/components/user/UnFollowedUser";
import { getCurrentUser } from "@/services/AuthService";
import { getAllUnFollow } from "@/services/UserService";

const Page = async () => {
  const user = await getCurrentUser();
  const { data: unFollowUser } = await getAllUnFollow(user?.email as string);

  return (
    <div>
      <UnFollowedUser users={unFollowUser} />
    </div>
  );
};

export default Page;
