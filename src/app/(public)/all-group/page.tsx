import AllGroupList from "@/components/group/AllGroupList";
import { getCurrentUser } from "@/services/AuthService";
import { getAllDisJoinGroup, getAllJoinGroup } from "@/services/GroupService";

const page = async () => {
  const user = await getCurrentUser();

  if (!user) return null;
  const { data: joinGroup } = await getAllJoinGroup(user?.email as string);
  const { data: disJoinGroup } = await getAllDisJoinGroup(
    user?.email as string
  );

  return (
    <div className="bg-background px-2 md:px-8 py-12 rounded-lg">
      <AllGroupList
        joinGroup={joinGroup}
        disJoinGroup={disJoinGroup}
        userEmail={user?.email as string}
      />
    </div>
  );
};

export default page;
