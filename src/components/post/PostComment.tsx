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
import {
  useCreateComment,
  useDeleteComment,
  useUpdateComment,
} from "@/hooks/post.hook";
import { useState } from "react";
import { format } from "date-fns";
import AvatarComponent from "../shared/AvatarComponent";

type Props = {
  userId: string;
  post: TPost;
};

const PostComment = ({ userId, post }: Props) => {
  const [commentText, setCommentText] = useState("");
  const [commentId, setCommentId] = useState("");

  const { mutate: creatingComment } = useCreateComment();
  const { mutate: updatingComment } = useUpdateComment();
  const { mutate: deletingComment } = useDeleteComment();

  const createComment = () => {
    if (commentId) {
      const data = {
        id: post._id as string,
        cid: commentId,
        comment: {
          text: commentText,
        },
      };
      updatingComment(data);
      setCommentId("");
    } else {
      const data = {
        id: post._id as string,
        comment: {
          text: commentText,
          userId,
        },
      };
      creatingComment(data);
    }

    setCommentText("");
  };

  const deleteComment = (cid: string) => {
    const data = {
      id: post._id as string,
      cid,
    };
    deletingComment(data);
  };

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

      <DialogContent className="w-full md:w-[700px] max-w-full md:max-w-[700px] h-[90vh] p-0">
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
                      <AvatarComponent
                        src={
                          typeof item.userId === "object"
                            ? item?.userId?.profileImage
                            : ""
                        }
                        isPro={
                          typeof item?.userId === "object"
                            ? item?.userId?.isPro
                            : false
                        }
                      />
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
                <div className=" flex-1">
                  <p className="border border-border rounded-lg p-4">
                    {item.text}
                  </p>
                  <small className="mt-1">
                    created:{" "}
                    <span className="text-primary">
                      {format(item?.createdAt as string, "PP")}
                    </span>
                  </small>
                </div>
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
                    <DropdownMenuItem
                      onClick={() => {
                        setCommentText(item?.text);
                        setCommentId(item?._id as string);
                      }}
                    >
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => deleteComment(item?._id as string)}
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ))}
          </div>
        </ScrollArea>
        <DialogFooter className="items-center gap-4 px-2 md:px-8">
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
