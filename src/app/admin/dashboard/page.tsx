import AllPostList from "@/components/admin/AllPostList";
import { getAllPost } from "@/services/PostService";

const Page = async () => {
  const { data: posts } = await getAllPost();

  return (
    <div className="p-4">
      <div className="border-b border-border">
        <div className="py-2 mb-2">
          <h2 className="text-2xl">All Post</h2>
        </div>
      </div>
      <div>
        <AllPostList posts={posts} />
      </div>
    </div>
  );
};

export default Page;
