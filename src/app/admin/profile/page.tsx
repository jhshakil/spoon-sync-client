import AdminProfile from "@/components/admin/AdminProfile";
import { getCurrentUser } from "@/services/AuthService";
import { getAdmin } from "@/services/UserService";

const Page = async () => {
  const user = await getCurrentUser();

  const { data: adminData } = await getAdmin(user?.email as string);

  return (
    <div className="p-4">
      <div className="border-b border-border">
        <div className="py-2 mb-2">
          <h2 className="text-2xl">Profile</h2>
        </div>
      </div>
      <AdminProfile user={adminData} />
    </div>
  );
};

export default Page;
