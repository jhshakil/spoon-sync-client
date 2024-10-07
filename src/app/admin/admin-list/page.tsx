import AllAdminList from "@/components/admin/AllAdminList";
import { getAllAdmin } from "@/services/UserService";

const Page = async () => {
  const { data: users } = await getAllAdmin();

  return (
    <div className="p-4">
      <div className="border-b border-border">
        <div className="py-2 mb-2">
          <h2 className="text-2xl">All Admins</h2>
        </div>
      </div>
      <AllAdminList users={users} />
    </div>
  );
};

export default Page;
