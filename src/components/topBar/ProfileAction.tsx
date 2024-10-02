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
import { logout } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { useRouter } from "next/navigation";

type Props = {
  username: string;
  role: string;
};

const ProfileAction = ({ username, role }: Props) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>@{username}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() =>
              role !== "user"
                ? router.push(`/admin/${username}/profile`)
                : router.push(`/${username}/profile`)
            }
          >
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              role !== "user"
                ? router.push(`/admin/${username}/dashboard`)
                : router.push(`/${username}/dashboard`)
            }
          >
            <CreditCard className="mr-2 h-4 w-4" />
            <span>Dashboard</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              role !== "user"
                ? router.push(`/admin/${username}/settings`)
                : router.push(`/${username}/settings`)
            }
          >
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => dispatch(logout())}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileAction;
