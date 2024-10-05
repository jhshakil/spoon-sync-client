import SinglePost from "@/components/post/SinglePost";
import { getSinglePost } from "@/services/PostService";

type Props = {
  searchParams?: { [key: string]: string | string[] | undefined };
};

const Page = async ({ searchParams }: Props) => {
  const postKey = searchParams?.key;

  const { data: post } = await getSinglePost(postKey as string);

  return (
    <div className="mb-8">
      <SinglePost post={post} />
    </div>
  );
};

export default Page;
