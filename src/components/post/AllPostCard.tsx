import { TPost } from "@/types/post.types";
import PostCard from "./PostCard";

type Props = {
  posts: TPost[];
};

const AllPostCard = ({ posts }: Props) => {
  if (!posts.length)
    return (
      <div className="bg-background p-8 text-center text-xl rounded-lg">
        No post found
      </div>
    );

  return (
    <div className="mb-8">
      {posts?.map((post: TPost) => (
        <div key={post._id}>
          <PostCard post={post} />
        </div>
      ))}
    </div>
  );
};

export default AllPostCard;
