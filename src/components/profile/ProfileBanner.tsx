import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "../ui/button";
import { TUserData } from "@/types/user.types";
import { EllipsisVertical, Pencil } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

type Props = {
  user: TUserData;
};

const ProfileBanner = ({ user }: Props) => {
  return (
    <div className="bg-background p-4 rounded-lg">
      <div className="flex justify-between gap-11">
        <div className="flex items-center gap-4">
          <Avatar className="w-[100px] h-[100px]">
            <AvatarImage
              src={user?.profileImage}
              alt="Profile Photo"
              className="object-cover"
            />
            <AvatarFallback className="uppercase">
              {user?.name[0]}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-medium">{user.name}</h1>
            <p className="text-sm">
              <span className="text-primary">
                {user?.follower?.length || 0}
              </span>{" "}
              followers |{" "}
              <span className="text-primary">
                {user?.following?.length || 0}
              </span>{" "}
              following
            </p>
            <Button size={"sm"} className="mt-2 px-5">
              Follow
            </Button>
            {/* <Button variant={"outline"} size={"sm"} className="mt-2 px-5">
              UnFollow
            </Button> */}
          </div>
        </div>
        <div className="flex justify-end items-top gap-3">
          <Link
            href={"/user/profile/create-post"}
            className={cn(buttonVariants())}
          >
            Create Post
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant={"secondary"} size={"icon"}>
                <EllipsisVertical />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-[90px]">
              <DropdownMenuItem asChild>
                <Link href={`/user/profile/edit`}>Edit Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={`/forget-password`}>Change Password</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default ProfileBanner;
