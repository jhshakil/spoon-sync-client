import React from "react";
import Logo from "../shared/Logo";
import MainSearch from "./MainSearch";
import TopBarAction from "./TopBarAction";
import { getCurrentUser } from "@/services/AuthService";
import { getUser } from "@/services/UserService";

const TopBar = async () => {
  const user = await getCurrentUser();

  const { data: userData } = await getUser(user?.email as string);

  return (
    <header className="w-full py-4 bg-background">
      <div className="container mx-auto px-2 grid grid-cols-5 justify-between items-center gap-8">
        <div>
          <Logo />
        </div>
        <div className="col-span-3 flex justify-center">
          <MainSearch />
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
