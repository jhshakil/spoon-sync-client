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
import { Trash2 } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";
import ConfirmDialog from "./ConfirmDialog";
import { TAdminData } from "@/types/user.types";

type Props = {
  users: TAdminData[];
};

const AllAdminList = ({ users }: Props) => {
  if (!users) return;
  const deletePost = () => {
    console.log("hi");
  };
  return (
    <div>
      <Table>
        <TableCaption>A list of Admins</TableCaption>
        <TableHeader>
          <TableRow className="gap-4">
            <TableHead>Email</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Profile Image</TableHead>
            <TableHead>Phone Number</TableHead>
            <TableHead>Is Blocked</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users?.map((user) => (
            <TableRow key={user._id}>
              <TableCell className="font-medium">{user.email}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>
                <div>
                  <Image
                    width={100}
                    height={100}
                    className="aspect-video object-cover"
                    src={user.profileImage}
                    alt="Profile"
                  />
                </div>
              </TableCell>
              <TableCell>{user.phoneNumber}</TableCell>
              <TableCell>{user?.authId?.status}</TableCell>
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
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AllAdminList;
