import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "../ui/button";
import { TUserData } from "@/types/user.types";
import { Crown, EllipsisVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import AvatarComponent from "../shared/AvatarComponent";

type Props = {
  user: TUserData;
};

const ProfileBanner = ({ user }: Props) => {
  return (
    <div className="bg-background p-4 rounded-lg">
      <div className="flex justify-between gap-11">
        <div className="flex items-center gap-4">
          <AvatarComponent
            src={user?.profileImage}
            className="w-[100px] h-[100px]"
            isPro={user?.isPro}
            fallback={user?.name[0]}
            badgeClassName="w-4 h-4"
          />
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
            <div className="flex gap-4 items-center">
              <Button size={"sm"} className="mt-2 px-5">
                Follow
              </Button>

              {/* <Button variant={"outline"} size={"sm"} className="mt-2 px-5">
              UnFollow
            </Button> */}
              <Link
                href={`/user/profile/upgrade-pro`}
                className={cn(
                  buttonVariants({ variant: "outline", size: "sm" }),
                  "mt-2 px-5"
                )}
              >
                <Crown className="mr-2 text-primary w-4 h-4" /> Upgrade to Pro
              </Link>
            </div>
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
