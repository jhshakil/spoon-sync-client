import EditProfile from "@/components/profile/EditProfile";
import { getCurrentUser } from "@/services/AuthService";
import { getUser } from "@/services/UserService";

const Page = async () => {
  const user = await getCurrentUser();

  const { data: userData } = await getUser(user?.email as string);

  return (
    <div>
      <EditProfile user={userData} />
    </div>
  );
};

export default Page;
