"use client";

import { CreditCard, LogOut, Settings, User } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { usePathname, useRouter } from "next/navigation";
import { logout } from "@/services/AuthService";
import { useUser } from "@/context/user.provider";
import { protectedRoutes } from "@/constant";

type Props = {
  username: string;
  role: string;
  profileImage: string;
};

const userRoutes = [
  {
    name: "Profile",
    path: "/user/profile",
    icon: <User className="mr-2 h-4 w-4" />,
  },
  {
    name: "Settings",
    path: "/user/settings",
    icon: <Settings className="mr-2 h-4 w-4" />,
  },
];

const adminRoutes = [
  {
    name: "Dashboard",
    path: "/admin/dashboard",
    icon: <CreditCard className="mr-2 h-4 w-4" />,
  },
];

const ProfileAction = ({ username, role, profileImage }: Props) => {
  const router = useRouter();
  const pathname = usePathname();

  const { setIsLoading: userLoading } = useUser();

  const handleLogout = () => {
    logout();
    userLoading(true);

    if (protectedRoutes.some((route) => pathname.match(route))) {
      router.push("/");
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar>
          <AvatarImage
            src={profileImage}
            alt="Profile"
            className="object-cover"
          />
          <AvatarFallback>SS</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>@{username}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {(role === "admin" || role === "superAdmin"
            ? adminRoutes
            : userRoutes
          )?.map((item) => (
            <DropdownMenuItem
              key={item.path}
              onClick={() => router.push(item.path)}
              className="cursor-pointer"
            >
              {item.icon}
              <span>{item.name}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>

        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => handleLogout()}
          className="cursor-pointer"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileAction;
