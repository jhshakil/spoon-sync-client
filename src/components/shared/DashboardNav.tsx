"use client";

import { cn } from "@/lib/utils";
import { TUser } from "@/types/user.types";
import Link from "next/link";
import { usePathname } from "next/navigation";

const ANav = [
  {
    name: "Profile",
    path: "/admin/profile",
  },
  {
    name: "Dashboard",
    path: "/admin/dashboard",
  },
  {
    name: "All Users",
    path: "/admin/user-list",
  },
];

const SNav = [
  {
    name: "Dashboard",
    path: "/admin/dashboard",
  },

  {
    name: "Create Admin",
    path: "/admin/create-admin",
  },
  {
    name: "All Users",
    path: "/admin/user-list",
  },
  {
    name: "All Admin",
    path: "/admin/admin-list",
  },
];

type Props = {
  user: TUser;
};

const DashboardNav = ({ user }: Props) => {
  const pathname = usePathname();
  const navItems = user?.role === "admin" ? ANav : SNav;

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(`${path}/`);
  };

  return (
    <div className="p-4">
      <div className="border-b border-border">
        <div className="py-2 mb-2 flex justify-between gap-8">
          <h2 className="text-2xl font-bold">Admin Panel</h2>
        </div>
      </div>
      <div className="mt-4">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                href={item.path}
                className={cn(
                  "flex items-center px-3 py-2 text-sm rounded-md transition-colors",
                  isActive(item.path)
                    ? "bg-primary text-primary-foreground font-medium"
                    : "hover:bg-muted text-muted-foreground hover:text-foreground"
                )}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DashboardNav;
