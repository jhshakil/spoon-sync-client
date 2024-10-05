import AllPostCard from "@/components/post/AllPostCard";
import { getAllPost } from "@/services/PostService";

const Page = async () => {
  const { data: posts } = await getAllPost();

  return (
    <div>
      <AllPostCard posts={posts} />
    </div>
  );
};

export default Page;
