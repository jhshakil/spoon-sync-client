import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";
import { TUserData } from "@/types/user.types";
import { Pencil } from "lucide-react";

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
              <span className="text-primary">200</span> followers |{" "}
              <span className="text-primary">100</span> following
            </p>
          </div>
        </div>
        <div className="flex flex-col items-end gap-3">
          <Link
            href={"/user/profile/edit"}
            className={cn(
              buttonVariants({ variant: "secondary", size: "icon" })
            )}
          >
            <Pencil className="w-4 h-4" />
          </Link>
          <Link
            href={"/user/profile/create-post"}
            className={cn(buttonVariants())}
          >
            Create Post
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfileBanner;
