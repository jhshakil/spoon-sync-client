import AllGroupList from "@/components/group/AllGroupList";
import { getCurrentUser } from "@/services/AuthService";
import { getAllDisJoinGroup, getAllJoinGroup } from "@/services/GroupService";
import { getUser } from "@/services/UserService";

const page = async () => {
  const user = await getCurrentUser();

  if (!user) return null;
  const { data: joinGroup } = await getAllJoinGroup(user?.email as string);
  const { data: disJoinGroup } = await getAllDisJoinGroup(
    user?.email as string
  );
  const { data: userData } = await getUser(user?.email as string);

  return (
    <div className="bg-background px-2 md:px-8 py-12 rounded-lg">
      <h1 className="mb-8 text-2xl font-bold"> Groups</h1>
      <AllGroupList
        joinGroup={joinGroup}
        disJoinGroup={disJoinGroup}
        userData={userData}
      />
    </div>
  );
};

export default page;
