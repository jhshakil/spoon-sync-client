import CreatePost from "@/components/post/CreatePost";
import { getCurrentUser } from "@/services/AuthService";
import { getUser } from "@/services/UserService";

type Props = {
  params: {
    id: string;
  };
};

const Page = async ({ params }: Props) => {
  const { id } = params;

  const user = await getCurrentUser();
  const { data: userData } = await getUser(user?.email as string);

  return (
    <div>
      <CreatePost email={userData?.email} userId={userData?._id} groupId={id} />
    </div>
  );
};

export default Page;
