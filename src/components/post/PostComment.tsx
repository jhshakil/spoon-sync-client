"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "../ui/textarea";
import { EllipsisVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ScrollArea } from "../ui/scroll-area";
import { cn } from "@/lib/utils";
import { TPost } from "@/types/post.types";
import { useCreateComment } from "@/hooks/post.hook";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

type Props = {
  userId: string;
  post: TPost;
};

const PostComment = ({ userId, post }: Props) => {
  const [commentText, setCommentText] = useState("");

  const { mutate: creatingComment } = useCreateComment();

  const createComment = () => {
    const data = {
      id: post._id as string,
      comment: {
        text: commentText,
        userId,
      },
    };
    creatingComment(data);
    setCommentText("");
  };

  console.log(post?.comment);

  return (
    <Dialog>
      <DialogTrigger asChild disabled={!userId}>
        <button
          className={cn(
            "cursor-pointer",
            userId ? "" : "opacity-30 cursor-not-allowed"
          )}
        >
          comment ({post.totalComment})
        </button>
      </DialogTrigger>

      <DialogContent className="w-[700px] max-w-[700px] h-[90vh] p-0">
        <ScrollArea className="h-[70vh] px-8 pt-4">
          <DialogHeader>
            <DialogTitle></DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div className="py-4 flex flex-col gap-4">
            {post?.comment?.map((item) => (
              <div key={item._id} className="flex gap-6">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Avatar className="w-8 h-8">
                        <AvatarImage
                          src={
                            typeof item.userId === "object"
                              ? item?.userId?.profileImage
                              : ""
                          }
                          alt="Profile"
                          className="object-cover"
                        />
                        <AvatarFallback className="uppercase">
                          {"S"}
                        </AvatarFallback>
                      </Avatar>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>
                        {typeof item.userId === "object"
                          ? item?.userId?.name
                          : ""}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <p className="border border-border rounded-lg p-4 flex-1">
                  {item.text}
                </p>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant={"secondary"}
                      size={"icon"}
                      className="bg-transparent"
                    >
                      <EllipsisVertical size={20} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="min-w-[90px]">
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem>Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ))}
          </div>
        </ScrollArea>
        <DialogFooter className="items-center gap-4 px-8">
          <Textarea
            className="resize-none h-[100px]"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
          <Button onClick={() => createComment()}>Comment</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PostComment;
