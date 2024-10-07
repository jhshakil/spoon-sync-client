import { TAdminData } from "@/types/user.types";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";

type Props = {
  user: TAdminData | null;
};

const HomeAdminProfile = ({ user }: Props) => {
  if (!user) return;
  return (
    <div className="bg-background p-4 rounded-lg">
      <div className="flex flex-col items-center gap-4">
        <Avatar className="w-[100px] h-[100px]">
          <AvatarImage
            src={user?.profileImage}
            alt="Profile Photo"
            className="object-cover"
          />
          <AvatarFallback className="uppercase">{user?.name[0]}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col items-center gap-1">
          <h1 className="text-2xl font-medium">{user.name}</h1>
        </div>

        <div className="flex h-5 items-center space-x-4 text-sm">
          <Link
            href={`/admin/profile`}
            className={cn(buttonVariants({ variant: "link" }))}
          >
            View Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomeAdminProfile;
