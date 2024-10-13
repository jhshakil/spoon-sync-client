import UnFollowedUser from "@/components/user/UnFollowedUser";
import { getCurrentUser } from "@/services/AuthService";
import { getAllUnFollow } from "@/services/UserService";

const Default = async () => {
  const user = await getCurrentUser();

  if (!user) return null;
  const { data: unFollowUser } = await getAllUnFollow(user?.email as string);

  return (
    <div>
      <UnFollowedUser users={unFollowUser} />
    </div>
  );
};

export default Default;
