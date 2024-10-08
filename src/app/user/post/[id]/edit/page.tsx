// import UpdatePost from "@/components/post/UpdatePost";
import { getCurrentUser } from "@/services/AuthService";
import { getSinglePost } from "@/services/PostService";
import dynamic from "next/dynamic";

type Props = {
  params: {
    id: string;
  };
};

const UpdatePost = dynamic(() => import("@/components/post/UpdatePost"), {
  ssr: false,
});

const Page = async ({ params: { id } }: Props) => {
  const user = await getCurrentUser();

  const { data: post } = await getSinglePost(id as string);

  return (
    <div>
      <UpdatePost email={user?.email} post={post} />
    </div>
  );
};

export default Page;
