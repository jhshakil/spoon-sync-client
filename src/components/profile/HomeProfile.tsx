import { TUserData } from "@/types/user.types";
import { Separator } from "../ui/separator";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";
import AvatarComponent from "../shared/AvatarComponent";

type Props = {
  user: TUserData | null;
};

const HomeProfile = ({ user }: Props) => {
  if (!user) return;
  return (
    <div className="bg-background p-4 rounded-lg">
      <div className="flex flex-col items-center gap-4">
        <AvatarComponent
          src={user?.profileImage}
          className="w-[100px] h-[100px]"
          isPro={user?.isPro}
          fallback={user?.name[0]}
          badgeClassName="w-4 h-4"
        />
        <div className="flex flex-col items-center gap-1">
          <h1 className="text-2xl font-medium">{user.name}</h1>
          <p className="text-sm">
            <span className="text-primary">{user?.follower?.length || 0}</span>{" "}
            followers |{" "}
            <span className="text-primary">{user?.following?.length || 0}</span>{" "}
            following
          </p>
        </div>
        <div>
          <p>{user?.bio}</p>
        </div>
        <div>
          <Separator className="my-4" />
          <div className="flex h-5 items-center space-x-4 text-sm">
            <div>256 Posts</div>
            <Separator orientation="vertical" />
            <Link
              href={`/user/profile`}
              className={cn(buttonVariants({ variant: "link" }))}
            >
              View Profile
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeProfile;
