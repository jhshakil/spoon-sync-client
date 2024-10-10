"use client";

import { useState } from "react";
import PostTextEditor from "./PostTextEditor";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button, buttonVariants } from "../ui/button";
import { UploadCloud, X } from "lucide-react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { imageUploadDB } from "@/lib/firebaseConfig";
import { v4 } from "uuid";
import { useDropzone } from "react-dropzone";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { TagInput } from "emblor";
import { TPost, TPostStatus } from "@/types/post.types";
import { useCreatePost } from "@/hooks/post.hook";
import { useRouter } from "next/navigation";

type Tag = {
  id: string;
  text: string;
};

type Props = {
  email: string;
  userId: string;
};

const CreatePost = ({ email, userId }: Props) => {
  const router = useRouter();

  const [content, setContent] = useState<string>("");
  const [preview, setPreview] = useState("");
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState<Tag[]>([]);
  const [activeTagIndex, setActiveTagIndex] = useState<number | null>(null);

  const {
    mutate: handleCreatePost,
    isPending: createPostPending,
    isSuccess,
  } = useCreatePost();

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/jpeg": [".jpeg", ".png"],
    },
    onDrop: (acceptedFiles) => {
      setPreview(URL.createObjectURL(acceptedFiles[0]));
    },
  });

  const handleChange = (newContent: string) => {
    setContent(newContent);
  };

  const submit = async (status: TPostStatus) => {
    const data: TPost = {
      userId,
      email,
      title: title,
      thumbnail: "",
      content: content,
      tags: tags,
      status,
    };
    if (acceptedFiles[0]) {
      const imgRef = ref(imageUploadDB, `/postThumb/${v4()}`);
      await uploadBytes(imgRef, acceptedFiles[0]).then(async (imgData) => {
        await getDownloadURL(imgData.ref).then((val) => (data.thumbnail = val));
      });
    }

    handleCreatePost(data);
  };

  if (!createPostPending && isSuccess) {
    router.push("/user/profile");
  }

  return (
    <div className="w-full p-8 bg-background rounded-lg flex flex-col justify-between gap-6">
      <div className="flex items-center space-x-4">
        <Label htmlFor="postTitle" className="text-xl">
          Title:
        </Label>
        <Input
          id="postTitle"
          placeholder="Enter post title"
          className="w-[400px] h-11"
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="flex flex-col space-x-4">
        <Label htmlFor="postTitle" className="text-xl">
          Thumbnail:
        </Label>
        {preview ? (
          <div className="relative w-[400px] mt-2">
            <div
              className="absolute top-0 -right-7 cursor-pointer"
              onClick={() => setPreview("")}
            >
              <X />
            </div>
            <Image width={400} height={400} src={preview} alt="Preview" />
          </div>
        ) : (
          <div>
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
                    Click to upload files &#40;files should be under 10 MB &#41;
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
        )}
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-xl">Content:</p>
        <PostTextEditor content={content} handleChange={handleChange} />
      </div>
      <div className="flex items-center space-x-4">
        <Label htmlFor="postTitle" className="text-xl">
          Tags:
        </Label>
        <TagInput
          placeholder="Enter your tag"
          tags={tags}
          setTags={(newTags) => {
            setTags(newTags);
          }}
          activeTagIndex={activeTagIndex}
          setActiveTagIndex={setActiveTagIndex}
        />
      </div>
      <div className="flex justify-end gap-2">
        <Link
          href={"/user/profile"}
          className={cn(buttonVariants({ variant: "outline" }))}
        >
          Cancel
        </Link>
        <Button variant={"secondary"} onClick={() => submit("draft")}>
          Save & Draft
        </Button>
        <Button onClick={() => submit("published")}>Save & Published</Button>
      </div>
    </div>
  );
};

export default CreatePost;
