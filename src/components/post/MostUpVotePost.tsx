import { getMostUpVotePost } from "@/services/PostService";
import { Separator } from "../ui/separator";
import { TPost } from "@/types/post.types";
import Link from "next/link";

const MostUpVotePost = async () => {
  const { data: posts } = await getMostUpVotePost();
  const stringToSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  return (
    <div className="bg-background mt-5 rounded-lg p-4">
      <h3 className="text-lg font-medium">Most up vote Post</h3>
      <Separator className="my-3" />
      <div>
        <ul className="flex flex-col gap-2">
          {posts?.map((post: TPost) => (
            <li key={post._id}>
              <Link href={`/post/${stringToSlug(post.title)}?key=${post._id}`}>
                {post.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MostUpVotePost;