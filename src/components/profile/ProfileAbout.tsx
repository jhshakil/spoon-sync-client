import { TUserData } from "@/types/user.types";

type Props = {
  userData: TUserData;
};

const ProfileAbout = ({ userData }: Props) => {
  return (
    <div className="p-4 bg-background rounded-lg">
      <div>
        <h2 className="text-2xl">About</h2>
        <p className="min-h-[60px]">{userData?.bio}</p>
      </div>
      <div>
        <p>
          Date of Birth:{" "}
          <span className="text-primary">{userData?.dateOfBirth}</span>
        </p>
      </div>
      <div>
        <p>
          Email: <span className="text-primary">{userData?.email}</span>
        </p>
      </div>
    </div>
  );
};

export default ProfileAbout;
