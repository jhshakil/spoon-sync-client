"use client";

import { cn } from "@/lib/utils";
import { TPost, TPostStatus } from "@/types/post.types";
import Link from "next/link";
import { Button, buttonVariants } from "../ui/button";
import Image from "next/image";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, ChevronUp, EllipsisVertical } from "lucide-react";
import {
  useDeletePost,
  useUpdatePost,
  useUpdatePostAction,
} from "@/hooks/post.hook";
import PostComment from "./PostComment";
import { format } from "date-fns";
import { Ratings } from "../ui/rattings";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  post: TPost;
  authId: string;
};

const PostCard = ({ post, authId }: Props) => {
  const { mutate: handleDeletePost } = useDeletePost();
  const { mutate: updatingPost } = useUpdatePost();
  const { mutate: updatingAction } = useUpdatePostAction();

  const stringToSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const deletePost = (id: string) => {
    handleDeletePost(id);
  };

  const updatePost = (id: string, status: TPostStatus) => {
    const data = {
      _id: id,
      status,
    };
    updatingPost(data);
  };

  const updateAction = (pId: string, actionType: string) => {
    const data = {
      id: pId,
      action: {
        type: actionType,
        authId,
      },
    };

    updatingAction(data);
  };

  return (
    <div className="bg-background px-8 py-4 rounded-lg flex flex-col gap-3">
      <div className="flex justify-between gap-11">
        <div>
          <h2
            className={cn(
              "text-[42px]",
              post?.status === "draft" ? "text-muted-foreground" : ""
            )}
          >
            {post.title}
          </h2>
          <div className="flex gap-3 items-center">
            <div className="flex gap-2 items-center">
              <Avatar className="w-8 h-8">
                <AvatarImage src={""} alt="Profile" className="object-cover" />
                <AvatarFallback className="uppercase">{"S"}</AvatarFallback>
              </Avatar>
              <p>@username</p>
            </div>{" "}
            |
            <div className="text-xs text-primary">
              {format(post?.createdAt as string, "PPP")}
            </div>{" "}
            |{" "}
            <div className="flex gap-2 items-center">
              <Ratings
                rating={2.5}
                variant="primary"
                totalstars={5}
                size={15}
              />{" "}
              <span>(2.5)</span>
            </div>
          </div>
        </div>
        <div className="flex justify-end items-center gap-3">
          <Link
            href={`/post/${stringToSlug(post.title)}?key=${post._id}`}
            className={cn(buttonVariants())}
          >
            See More
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant={"secondary"} size={"icon"}>
                <EllipsisVertical />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-[90px]">
              <DropdownMenuItem asChild>
                <Link href={`/user/post/${post._id}/edit`}>Edit</Link>
              </DropdownMenuItem>
              {post.status === "published" ? (
                <DropdownMenuItem
                  onClick={() => updatePost(post._id as string, "draft")}
                >
                  Draft
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem
                  onClick={() => updatePost(post._id as string, "published")}
                >
                  Published
                </DropdownMenuItem>
              )}

              <DropdownMenuItem onClick={() => deletePost(post?._id as string)}>
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div
        dangerouslySetInnerHTML={{ __html: post.content }}
        className="line-clamp-4 text-[16px] [&>h2]:text-[30px] [&>h3]:text-[25px] [&>h4]:text-[16px] [&>h5]:text-[14px] [&>p>a]:text-primary"
      ></div>
      <Image
        width={800}
        height={800}
        src={post.thumbnail}
        className="w-full h-full aspect-video object-cover"
        alt="thumbnail"
      />
      <div className="flex justify-between items-center mt-3">
        <div className="flex gap-8">
          <button
            disabled={!authId}
            className={cn(
              "flex gap-2 cursor-pointer",
              authId ? "" : "opacity-30 cursor-not-allowed"
            )}
            onClick={() => updateAction(post?._id as string, "up")}
          >
            <span>{post.totalUpVote}</span> <ChevronUp />
          </button>
          <button
            disabled={!authId}
            className={cn(
              "flex gap-2 cursor-pointer",
              authId ? "" : "opacity-30 cursor-not-allowed"
            )}
            onClick={() => updateAction(post?._id as string, "down")}
          >
            <span>{post.totalDownVote}</span> <ChevronDown />
          </button>
        </div>
        <div>
          <PostComment authId={authId} />
        </div>
        <div>
          <Select disabled={!authId}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Rate this post" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="5">
                  <Ratings
                    rating={5}
                    variant="primary"
                    totalstars={5}
                    size={15}
                  />
                </SelectItem>
                <SelectItem value="4">
                  <Ratings
                    rating={4}
                    variant="primary"
                    totalstars={5}
                    size={15}
                  />
                </SelectItem>
                <SelectItem value="3">
                  <Ratings
                    rating={3}
                    variant="primary"
                    totalstars={5}
                    size={15}
                  />
                </SelectItem>
                <SelectItem value="2">
                  <Ratings
                    rating={2}
                    variant="primary"
                    totalstars={5}
                    size={15}
                  />
                </SelectItem>
                <SelectItem value="1">
                  <Ratings
                    rating={1}
                    variant="primary"
                    totalstars={5}
                    size={15}
                  />
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
