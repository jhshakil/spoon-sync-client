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
import { EllipsisVertical } from "lucide-react";
import { useDeletePost, useUpdatePost } from "@/hooks/post.hook";

type Props = {
  post: TPost;
};

const PostCard = ({ post }: Props) => {
  const { mutate: handleDeletePost } = useDeletePost();
  const { mutate: updatingPost } = useUpdatePost();

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

  return (
    <div className="bg-background p-8 rounded-lg flex flex-col gap-3">
      <div className="flex justify-between gap-11">
        <h2
          className={cn(
            "text-[42px]",
            post?.status === "draft" ? "text-muted-foreground" : ""
          )}
        >
          {post.title}
        </h2>
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
    </div>
  );
};

export default PostCard;
