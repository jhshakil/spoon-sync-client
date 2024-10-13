import { TPost } from "@/types/post.types";
import PostCard from "./PostCard";
import { getCurrentUser } from "@/services/AuthService";
import { getAdmin, getUser } from "@/services/UserService";

type Props = {
  posts: TPost[];
};

const AllPostCard = async ({ posts }: Props) => {
  const user = await getCurrentUser();

  let userId: string = "";
  let userEmail: string = "";
  let isUserPro: boolean = false;

  try {
    if (user?.role === "admin") {
      const { data } = await getAdmin(user?.email as string);

      userId = data?._id || "";
      userEmail = data?.email || "";
    } else {
      const { data } = await getUser(user?.email as string);
      userId = data?._id || "";
      userEmail = data?.email || "";
      isUserPro = data?.isPro || false;
    }
  } catch (error: any) {
    console.log(error.message);
  }

  if (!posts?.length)
    return (
      <div className="bg-background p-8 text-center text-xl rounded-lg">
        No post found
      </div>
    );

  return (
    <div className="mb-8 flex flex-col gap-4">
      {posts?.map((post: TPost) => (
        <div key={post._id}>
          <PostCard
            post={post}
            userId={userId as string}
            userEmail={userEmail}
            isUserPro={isUserPro}
          />
        </div>
      ))}
    </div>
  );
};

export default AllPostCard;
