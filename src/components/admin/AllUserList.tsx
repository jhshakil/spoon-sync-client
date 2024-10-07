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
import { TUserData, TUserStatus } from "@/types/user.types";
import { useDeleteUser, useUpdateStatus } from "@/hooks/user.hook";

type Props = {
  users: TUserData[];
};

const AllUserList = ({ users }: Props) => {
  const { mutate: updatingUser } = useUpdateStatus();

  const { mutate: deletingUser } = useDeleteUser();

  const deletePost = (email: string) => {
    deletingUser(email);
  };

  const updatePost = (email: string, status: TUserStatus) => {
    const data = {
      email,
      status,
    };
    updatingUser(data);
  };

  return (
    <div>
      <Table>
        <TableCaption>A list of Users</TableCaption>
        <TableHeader>
          <TableRow className="gap-4">
            <TableHead>Email</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Profile Image</TableHead>
            <TableHead>Phone Number</TableHead>
            <TableHead>Status</TableHead>
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
                  onSubmit={() => deletePost(user?.email as string)}
                >
                  <Button variant={"outline"} size={"icon"}>
                    <Trash2 color="red" />
                  </Button>
                </ConfirmDialog>
                {user?.authId?.status === "active" ? (
                  <ConfirmDialog
                    titleMessage="Confirm Message"
                    descriptionMessage="Are you sure! You want to Block"
                    onSubmit={() => updatePost(user?.email, "blocked")}
                  >
                    <Button>Block</Button>
                  </ConfirmDialog>
                ) : (
                  <ConfirmDialog
                    titleMessage="Confirm Message"
                    descriptionMessage="Are you sure! You want to Active"
                    onSubmit={() => updatePost(user?.email, "active")}
                  >
                    <Button>Active</Button>
                  </ConfirmDialog>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AllUserList;
