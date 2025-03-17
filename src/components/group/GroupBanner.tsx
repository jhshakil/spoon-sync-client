"use client";

import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { EllipsisVertical, Pencil, Users } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { TGroup } from "@/types/group.type";

type Props = {
  group: TGroup;
  onJoin?: (groupId: string) => void;
  onLeave?: (groupId: string) => void;
};

const GroupBanner = ({ group, onJoin, onLeave }: Props) => {
  const [isJoined, setIsJoined] = useState(true);
  //   const [isJoined, setIsJoined] = useState(group.isJoined);

  const handleJoinLeave = () => {
    if (isJoined) {
      onLeave?.(group._id as string);
      setIsJoined(false);
    } else {
      onJoin?.(group._id as string);
      setIsJoined(true);
    }
  };

  return (
    <div className="bg-background rounded-lg overflow-hidden">
      {/* Banner Image */}
      <div className="relative h-48 w-full bg-muted">
        {group.banner ? (
          <Image
            src={group.banner || "/placeholder.svg"}
            alt={`${group.name} banner`}
            fill
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10" />
        )}

        {/* Edit banner button (only for admins) */}
        {/* {group.isAdmin && ( */}
        <Button
          size="icon"
          variant="secondary"
          className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm"
        >
          <Pencil className="h-4 w-4" />
        </Button>
        {/* )} */}
      </div>

      {/* Group Info Section */}
      <div className="p-4 relative">
        {/* Logo/Avatar - positioned to overlap the banner */}
        <div className="absolute -top-16 left-6 ring-4 ring-background rounded-full">
          <Avatar
            className={cn("border-2 border-background w-[100px] h-[100px]")}
          >
            <AvatarImage src={group.logo || ""} />
            <AvatarFallback>{group.name[0]}</AvatarFallback>
          </Avatar>
        </div>

        <div className="flex flex-wrap md:flex-nowrap justify-between gap-4 pt-12">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold">{group.name}</h1>
              {/* {group.privacy === "Private" && (
                <span className="text-xs bg-muted px-2 py-1 rounded-full">
                  Private Group
                </span>
              )} */}
            </div>

            <div className="flex items-center gap-2 text-muted-foreground mt-1">
              <Users className="h-4 w-4" />
              <span>{group.members.length} members</span>
            </div>

            {group.description && (
              <p className="mt-2 text-sm text-muted-foreground max-w-2xl">
                {group.description}
              </p>
            )}
          </div>

          <div className="flex items-start gap-3 mt-2 md:mt-0">
            <>
              <Link
                href={`/groups/${group._id}/create-post`}
                className={cn(buttonVariants())}
              >
                Create Post
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="secondary" size="icon">
                    <EllipsisVertical />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="min-w-[160px]">
                  <DropdownMenuItem asChild>
                    <Link href={`/groups/${group._id}/edit`}>Edit Group</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href={`/groups/${group._id}/members`}>
                      Manage Members
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href={`/groups/${group._id}/settings`}>
                      Group Settings
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
            {/* {group.isAdmin ? (
              <>
                <Link
                  href={`/groups/${group._id}/create-post`}
                  className={cn(buttonVariants())}
                >
                  Create Post
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="secondary" size="icon">
                      <EllipsisVertical />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="min-w-[160px]">
                    <DropdownMenuItem asChild>
                      <Link href={`/groups/${group._id}/edit`}>Edit Group</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href={`/groups/${group._id}/members`}>
                        Manage Members
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href={`/groups/${group._id}/settings`}>
                        Group Settings
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <Button
                variant={isJoined ? "outline" : "default"}
                onClick={handleJoinLeave}
                className="min-w-[100px]"
              >
                {isJoined ? "Leave" : "Join"}
              </Button>
            )} */}
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-t border-border px-4">
        <div className="flex space-x-4 overflow-x-auto">
          <Link
            href={`/groups/${group._id}`}
            className="py-3 px-1 border-b-2 border-primary font-medium text-sm"
          >
            Discussion
          </Link>
          <Link
            href={`/groups/${group._id}/about`}
            className="py-3 px-1 border-b-2 border-transparent hover:border-primary/50 text-muted-foreground hover:text-foreground transition-colors text-sm"
          >
            About
          </Link>
          <Link
            href={`/groups/${group._id}/members`}
            className="py-3 px-1 border-b-2 border-transparent hover:border-primary/50 text-muted-foreground hover:text-foreground transition-colors text-sm"
          >
            Members
          </Link>
          <Link
            href={`/groups/${group._id}/media`}
            className="py-3 px-1 border-b-2 border-transparent hover:border-primary/50 text-muted-foreground hover:text-foreground transition-colors text-sm"
          >
            Media
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GroupBanner;
