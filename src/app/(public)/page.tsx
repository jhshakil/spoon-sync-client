import AllPostCard from "@/components/post/AllPostCard";
import { getAllPost } from "@/services/PostService";

const Page = async () => {
  const { data: posts } = await getAllPost();

  return (
    <>
      <AllPostCard posts={posts} />
    </>
  );
};

export default Page;
