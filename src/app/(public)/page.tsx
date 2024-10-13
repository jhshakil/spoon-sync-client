import AllPostCard from "@/components/post/AllPostCard";
import { getCurrentUser } from "@/services/AuthService";
import { getAllPost } from "@/services/PostService";

const Page = async () => {
  const user = await getCurrentUser();
  const { data: posts } = await getAllPost(user?.email);

  return (
    <>
      <AllPostCard posts={posts} />
    </>
  );
};

export default Page;
