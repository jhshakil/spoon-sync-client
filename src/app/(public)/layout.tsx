import { ScrollArea } from "@/components/ui/scroll-area";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Layout = ({
  children,
  leftSideBar,
  rightSideBar,
}: {
  children: React.ReactNode;
  leftSideBar: React.ReactNode;
  rightSideBar: React.ReactNode;
}) => {
  return (
    <div className="flex flex-col lg:flex-row justify-between gap-4 mt-5">
      <ScrollArea className="h-[calc(100vh-95px)] w-[280px] hidden lg:block">
        <div className="w-full">{leftSideBar}</div>
      </ScrollArea>
      <Drawer direction="left">
        <DrawerTrigger asChild className="lg:hidden w-[50px] mx-3">
          <Button>
            <Menu />
          </Button>
        </DrawerTrigger>
        <DrawerContent className="w-[280px] mt-8 rounded-none">
          <div>
            <DrawerHeader>
              <div className="flex justify-end">
                <DrawerClose asChild>
                  <Button variant="secondary" size={"icon"}>
                    <X />
                  </Button>
                </DrawerClose>
              </div>
              <DrawerTitle className="hidden"></DrawerTitle>
              <DrawerDescription className="hidden"></DrawerDescription>
            </DrawerHeader>
            <ScrollArea className="h-[calc(100vh-70px)] w-[280px]">
              <div className="w-full">{leftSideBar}</div>
            </ScrollArea>
          </div>
        </DrawerContent>
      </Drawer>
      <ScrollArea className="h-[calc(100vh-95px)] flex-1">
        <div>{children}</div>
      </ScrollArea>
      <ScrollArea className="h-[calc(100vh-95px)] w-[280px] hidden xl:block">
        <div className="w-full">{rightSideBar}</div>
      </ScrollArea>
    </div>
  );
};

export default Layout;
