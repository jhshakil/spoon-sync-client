import CreateAdminForm from "@/components/admin/CreateAdminForm";

const Page = () => {
  return (
    <div className="p-4">
      <div className="border-b border-border">
        <div className="py-2 mb-2">
          <h2 className="text-2xl">Create Admin</h2>
        </div>
      </div>
      <CreateAdminForm />
    </div>
  );
};

export default Page;
