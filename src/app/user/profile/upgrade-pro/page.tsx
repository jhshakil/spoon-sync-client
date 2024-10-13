import PaymentForPro from "@/components/user/PaymentForPro";
import { getCurrentUser } from "@/services/AuthService";

const Page = async () => {
  const user = await getCurrentUser();
  return (
    <div className="w-full max-w-[1024px] mx-auto mt-5 grid grid-cols-3 justify-between gap-8">
      <div className="col-span-2 bg-background p-4 rounded-lg">
        <h2 className="text-2xl">Feature includes in Pro</h2>
        <div className="mt-5">
          <ul className="list-disc px-8">
            <li>Access all Pro content</li>
            <li>Get a Pro badge</li>
          </ul>
        </div>
      </div>
      <div className="bg-background p-4 rounded-lg">
        <PaymentForPro email={user?.email} />
      </div>
    </div>
  );
};

export default Page;
