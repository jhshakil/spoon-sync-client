import { TGroup } from "@/types/group.type";
import Link from "next/link";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

type Props = {
  groups: TGroup[];
  onJoinGroup: (groupId: string) => void;
  userId: string;
};

const GroupCard = ({ groups, onJoinGroup, userId }: Props) => {
  const formatMemberCount = (count: number) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    }
    if (count >= 1000) {
      return `${(count / 1000).toFixed(0)}K`;
    }
    return count.toString();
  };

  const isMember = (group: TGroup) => {
    const result = group.members.find((el) => (el._id = userId));
    const result2 = group.admins.find((el) => (el._id = userId));
    if (result || result2) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <>
      {groups.map((group) => (
        <div
          key={group._id}
          className="flex items-center justify-between p-4 bg-card rounded-lg mb-3"
        >
          <div className="flex items-center gap-3">
            <Avatar className="h-16 w-16 border-2 border-background">
              <AvatarImage src={group.logo || ""} alt={group.name} />
              <AvatarFallback>{group.name.charAt(0)}</AvatarFallback>
            </Avatar>

            <div className="flex flex-col">
              <Link
                href={`/groups/${group._id}`}
                className="font-semibold hover:underline"
              >
                {group.name}
              </Link>
              <div className="text-sm text-muted-foreground">
                {formatMemberCount(group?.members?.length)} members
              </div>
              {/* <div className="text-sm text-muted-foreground">
              {group.privacy} · {formatMemberCount(group.members)} members · {group.postsPerDay}+ posts a day
            </div> */}

              {group.members.length > 0 && (
                <div className="flex items-center mt-1">
                  <div className="flex -space-x-2 mr-2">
                    {group.members.slice(0, 3).map((friend) => (
                      <Avatar
                        key={friend._id}
                        className="h-6 w-6 border-2 border-background"
                      >
                        <AvatarImage
                          src={friend.profileImage || ""}
                          alt={friend.name}
                        />
                        <AvatarFallback>{friend.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {group.members.length} friends are members
                  </span>
                </div>
              )}
            </div>
          </div>

          <Button
            variant={isMember(group) ? "outline" : "default"}
            className="w-20"
            onClick={() => onJoinGroup(group._id as string)}
          >
            {isMember(group) ? "Leave" : "Join"}
          </Button>
        </div>
      ))}
    </>
  );
};

export default GroupCard;
