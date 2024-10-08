import CreatePost from "@/components/post/CreatePost";
import { getCurrentUser } from "@/services/AuthService";

const Page = async () => {
  const user = await getCurrentUser();

  return (
    <div>
      <CreatePost email={user?.email} />
    </div>
  );
};

export default Page;
