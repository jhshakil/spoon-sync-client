import { Menu } from "lucide-react";
import Link from "next/link";

const Nav = [
  {
    name: "Profile",
    path: "/admin/profile",
  },
  {
    name: "Dashboard",
    path: "/admin/dashboard",
  },

  {
    name: "Create Admin",
    path: "/admin/create-admin",
  },
];

const DashboardNav = () => {
  return (
    <div className="p-4">
      <div className="border-b border-border">
        <div className="py-2 mb-2 flex justify-between gap-8">
          <h2 className="text-2xl">Admin</h2>
          <Menu />
        </div>
      </div>
      <div>
        <ul>
          {Nav?.map((el) => (
            <li key={el.path} className="py-2 border-b border-border">
              <Link href={el.path}>{el.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DashboardNav;
