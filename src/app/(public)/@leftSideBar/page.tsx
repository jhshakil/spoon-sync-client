import HomeAdminProfile from "@/components/profile/HomeAdminProfile";
import HomeProfile from "@/components/profile/HomeProfile";
import { getCurrentUser } from "@/services/AuthService";
import { getAdmin, getUser } from "@/services/UserService";
import { TAdminData, TUserData } from "@/types/user.types";

const Page = async () => {
  const user = await getCurrentUser();

  let userData: TUserData | null = null;
  let adminUserData: TAdminData | null = null;

  try {
    if (user?.role === "admin") {
      const { data } = await getAdmin(user?.email as string);
      adminUserData = data;
    } else {
      const { data } = await getUser(user?.email as string);
      userData = data;
    }
  } catch (error: any) {
    console.log(error.message);
  }

  return (
    <div>
      {user?.role === "user" ? (
        <HomeProfile user={userData} />
      ) : (
        <HomeAdminProfile user={adminUserData} />
      )}
    </div>
  );
};

export default Page;
