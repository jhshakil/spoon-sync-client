import AllUserList from "@/components/admin/AllUserList";
import { getAllUser } from "@/services/UserService";

const Page = async () => {
  const { data: users } = await getAllUser();

  return (
    <div className="p-4">
      <div className="border-b border-border">
        <div className="py-2 mb-2">
          <h2 className="text-2xl">All Users</h2>
        </div>
      </div>
      <AllUserList users={users} />
    </div>
  );
};

export default Page;
