"use client";

import GetUserFromToken from "@/lib/getUserFromToken";
import { useRouter } from "next/navigation";
import ThemeMode from "./ThemeMode";
import { Button } from "../ui/button";
import ProfileAction from "./ProfileAction";

const TopBarAction = () => {
  const user = GetUserFromToken();
  const router = useRouter();

  return (
    <>
      {user?.email ? (
        <>
          <ThemeMode />
          <ProfileAction />
        </>
      ) : (
        <>
          <Button onClick={() => router.push("/login")}>Login</Button>
          <Button
            variant={"secondary"}
            onClick={() => router.push("/registration")}
          >
            Registration
          </Button>
          <ThemeMode />
        </>
      )}
    </>
  );
};

export default TopBarAction;
