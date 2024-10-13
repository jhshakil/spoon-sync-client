import React from "react";
import Logo from "../shared/Logo";
import MainSearch from "./MainSearch";
import TopBarAction from "./TopBarAction";
import { getCurrentUser } from "@/services/AuthService";
import { getAdmin, getUser } from "@/services/UserService";
import { TAdminData, TUserData } from "@/types/user.types";

const TopBar = async () => {
  const user = await getCurrentUser();

  let userData: TUserData | TAdminData | null = null;

  try {
    if (user?.role === "admin") {
      const { data } = await getAdmin(user?.email as string);
      userData = data;
    } else {
      const { data } = await getUser(user?.email as string);
      userData = data;
    }
  } catch (error: any) {
    console.log(error.message);
  }

  return (
    <header className="w-full py-4 bg-background">
      <div className="container mx-auto px-2 grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 justify-between items-center gap-3 md:gap-8">
        <div>
          <Logo />
        </div>
        <div className="md:col-span-2 lg:col-span-3 flex justify-center">
          <MainSearch userEmail={user?.email} />
        </div>
        <div className="flex justify-end gap-2 items-center">
          <TopBarAction
            username={user?.username}
            role={user?.role}
            userData={userData}
          />
        </div>
      </div>
    </header>
  );
};

export default TopBar;
