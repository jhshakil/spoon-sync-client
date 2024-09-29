import React from "react";
import Logo from "../shared/Logo";
import ProfileAction from "./ProfileAction";
import MainSearch from "./MainSearch";
import { Button } from "../ui/button";

const TopBar = () => {
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
          <Button>Login</Button>
          <Button variant={"secondary"}>Registration</Button>
          <ProfileAction />
        </div>
      </div>
    </header>
  );
};

export default TopBar;
