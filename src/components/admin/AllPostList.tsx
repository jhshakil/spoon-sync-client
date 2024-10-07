"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { TPost } from "@/types/post.types";
import { Trash2 } from "lucide-react";
import Image from "next/image";
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
            <TableHead>Status</TableHead>
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
                    className="aspect-video object-cover"
                    src={post.thumbnail}
                    alt="Thumbnail"
                  />
                </div>
              </TableCell>
              <TableCell>{post.status}</TableCell>
              <TableCell className="flex justify-end gap-4 items-center h-[64px]">
                <ConfirmDialog
                  titleMessage="Confirm Message"
                  descriptionMessage="Are you sure! You want to delete it"
                  onSubmit={deletePost}
                >
                  <Button variant={"outline"} size={"icon"}>
                    <Trash2 color="red" />
                  </Button>
                </ConfirmDialog>
                <ConfirmDialog
                  titleMessage="Confirm Message"
                  descriptionMessage="Are you sure! You want to Block"
                  onSubmit={deletePost}
                >
                  <Button>Block</Button>
                </ConfirmDialog>
                <ConfirmDialog
                  titleMessage="Confirm Message"
                  descriptionMessage="Are you sure! You want to Published"
                  onSubmit={deletePost}
                >
                  <Button variant={"outline"}>Publish</Button>
                </ConfirmDialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AllPostList;
