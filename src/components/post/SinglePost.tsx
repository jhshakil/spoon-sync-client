import { TPost } from "@/types/post.types";
import Image from "next/image";

type Props = {
  post: TPost;
};

const SinglePost = ({ post }: Props) => {
  if (!post)
    return (
      <div className="bg-background p-8 text-center text-xl rounded-lg">
        No post found
      </div>
    );
  return (
    <div className="bg-background p-8 rounded-lg flex flex-col gap-3">
      <h1 className="text-[42px]">{post.title}</h1>
      <Image
        width={800}
        height={800}
        src={post.thumbnail}
        className="w-full h-full aspect-video object-cover"
        alt="thumbnail"
      />
      <div
        dangerouslySetInnerHTML={{ __html: post.content }}
        className="text-[16px] [&>h2]:text-[30px] [&>h3]:text-[25px] [&>h4]:text-[16px] [&>h5]:text-[14px] [&>p>a]:text-primary"
      ></div>
    </div>
  );
};

export default SinglePost;
