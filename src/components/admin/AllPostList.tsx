"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TPost } from "@/types/post.types";
import { ShieldBan, ShieldCheck, Trash2 } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import { Button } from "../ui/button";
import ConfirmDialog from "./ConfirmDialog";

type Props = {
  posts: TPost[];
};

const AllPostList = ({ posts }: Props) => {
  const deletePost = () => {
    console.log("hi");
  };
  return (
    <div>
      <Table>
        <TableCaption>A list of Posts</TableCaption>
        <TableHeader>
          <TableRow className="gap-4">
            <TableHead>Email</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Thumbnail</TableHead>
            <TableHead>Is Published</TableHead>
            <TableHead>Is Blocked</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {posts?.map((post) => (
            <TableRow key={post._id}>
              <TableCell className="font-medium">{post.email}</TableCell>
              <TableCell>{post.title}</TableCell>
              <TableCell>
                <div>
                  <Image
                    width={100}
                    height={100}
                    className="aspect-video"
                    src={post.thumbnail}
                    alt="Thumbnail"
                  />
                </div>
              </TableCell>
              <TableCell>{post.isPublished}</TableCell>
              <TableCell>{post.isBlocked}</TableCell>
              <TableCell className="flex justify-end gap-4 items-center h-[64px]">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <ConfirmDialog
                        titleMessage="Confirm Message"
                        descriptionMessage="Are you sure! You want to delete it"
                        onSubmit={deletePost}
                      >
                        <Button variant={"outline"} size={"icon"}>
                          <Trash2 color="red" />
                        </Button>
                      </ConfirmDialog>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Delete Post</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <ConfirmDialog
                        titleMessage="Confirm Message"
                        descriptionMessage="Are you sure! You want to Block"
                        onSubmit={deletePost}
                      >
                        <Button variant={"outline"} size={"icon"}>
                          <ShieldBan color="orange" />
                        </Button>
                      </ConfirmDialog>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Blocked</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <ConfirmDialog
                        titleMessage="Confirm Message"
                        descriptionMessage="Are you sure! You want to Published"
                        onSubmit={deletePost}
                      >
                        <Button variant={"outline"} size={"icon"}>
                          <ShieldCheck color="green" />
                        </Button>
                      </ConfirmDialog>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Published</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">$2,500.00</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};

export default AllPostList;
