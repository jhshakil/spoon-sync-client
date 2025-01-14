import AllUserCardList from "@/components/shared/AllUserCardList";
import { getCurrentUser } from "@/services/AuthService";
import { getAllUnFollow } from "@/services/UserService";

const page = async () => {
  const user = await getCurrentUser();

  if (!user) return null;
  const { data: unFollowUser } = await getAllUnFollow(user?.email as string);
  return (
    <div className="bg-background px-2 md:px-8 py-12 rounded-lg">
      <h1 className="mb-8 text-2xl font-bold"> Users</h1>
      <AllUserCardList users={unFollowUser} />
    </div>
  );
};

export default page;
