import CreatePost from "@/components/post/CreatePost";
import { getCurrentUser } from "@/services/AuthService";
import { getUser } from "@/services/UserService";

const Page = async () => {
  const user = await getCurrentUser();
  const { data: userData } = await getUser(user?.email as string);

  return (
    <div>
      <CreatePost email={userData?.email} userId={userData?._id} />
    </div>
  );
};

export default Page;
