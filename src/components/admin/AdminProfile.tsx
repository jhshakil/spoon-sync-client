"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useDropzone } from "react-dropzone";

import { TAdminData } from "@/types/user.types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { UploadCloud } from "lucide-react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { imageUploadDB } from "@/lib/firebaseConfig";
import { v4 } from "uuid";
import { useUpdateAdmin } from "@/hooks/user.hook";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AvatarComponent from "../shared/AvatarComponent";

type Props = {
  user: TAdminData;
};

// schema
const FormSchema = z.object({
  name: z.string().min(2, {
    message: "Must be at least 2 characters.",
  }),
  profileImage: z.string().optional(),
  phoneNumber: z.string().optional(),
});

const AdminProfile = ({ user }: Props) => {
  const router = useRouter();
  const [preview, setPreview] = useState("");

  const { mutate: handleUpdateAdmin, isPending, isSuccess } = useUpdateAdmin();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: user?.name || "",
      profileImage: user?.profileImage || "",
      phoneNumber: user?.phoneNumber || "",
    },
  });

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/jpeg": [".jpeg", ".png"],
    },
    onDrop: (acceptedFiles) => {
      setPreview(URL.createObjectURL(acceptedFiles[0]));
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    if (acceptedFiles[0]) {
      const imgRef = ref(imageUploadDB, `/files/${v4()}`);
      await uploadBytes(imgRef, acceptedFiles[0]).then(async (imgData) => {
        await getDownloadURL(imgData.ref).then(
          (val) => (data.profileImage = val)
        );
      });
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-expect-error
    handleUpdateAdmin(data);
  }

  useEffect(() => {
    if (!isPending && isSuccess) {
      router.push("/admin/profile");
    }
  }, [isPending, isSuccess]);

  return (
    <Card className="w-full md:w-3/4 mx-auto my-8">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Edit your Profile</CardTitle>
        <CardDescription>
          Fill your data below to update profile
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your phone number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <p className="text-sm">Profile Image</p>
              <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-8 mt-5">
                {user?.profileImage || preview ? (
                  <AvatarComponent
                    src={user?.profileImage || preview}
                    className="w-[100px] h-[100px]"
                    badgeClassName="w-4 h-4"
                  />
                ) : (
                  ""
                )}
                <div className="md:col-span-2">
                  <label
                    {...getRootProps()}
                    className="relative flex flex-col items-center justify-center w-full py-6 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 mt-2"
                  >
                    <div className=" text-center">
                      <div className=" border p-2 rounded-md max-w-min mx-auto">
                        <UploadCloud size={20} />
                      </div>

                      <p className="mt-2 text-sm text-gray-600">
                        <span className="font-semibold">Drag files</span>
                      </p>
                      {acceptedFiles[0]?.name ? (
                        <p className="text-xs text-gray-500">
                          {acceptedFiles[0].name}
                        </p>
                      ) : (
                        <p className="text-xs text-gray-500">
                          Click to upload files &#40;files should be under 10 MB
                          &#41;
                        </p>
                      )}
                    </div>
                  </label>

                  <Input
                    {...getInputProps()}
                    id="dropzone-file"
                    accept="image/png, image/jpeg"
                    type="file"
                    className="hidden"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end items-center gap-4">
              <Link
                href={"/user/profile"}
                className={cn(buttonVariants({ variant: "secondary" }))}
              >
                Back to Profile
              </Link>
              <Button type="submit">Update</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default AdminProfile;
