import { cn } from "@/lib/utils";
import { TPost } from "@/types/post.types";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import Image from "next/image";

type Props = {
  post: TPost;
};

const PostCard = ({ post }: Props) => {
  const stringToSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  return (
    <div className="bg-background p-8 rounded-lg flex flex-col gap-3">
      <div className="flex justify-between gap-11">
        <h2 className="text-[42px]">{post.title}</h2>
        <Link
          href={`/post/${stringToSlug(post.title)}?key=${post._id}`}
          className={cn(buttonVariants())}
        >
          See More
        </Link>
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
