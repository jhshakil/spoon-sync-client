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
      <ScrollArea className="h-[90vh] w-[280px] px-3 hidden lg:block">
        <div className="w-full">{leftSideBar}</div>
      </ScrollArea>
      <Drawer direction="left">
        <DrawerTrigger asChild className="lg:hidden w-[50px] mx-3">
          <Button>
            <Menu />
          </Button>
        </DrawerTrigger>
        <DrawerContent className="w-[280px] mt-8">
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
            <ScrollArea className="h-[90vh] w-[280px] px-3">
              <div className="w-full">{leftSideBar}</div>
            </ScrollArea>
          </div>
        </DrawerContent>
      </Drawer>
      <ScrollArea className="h-[90vh] flex-1 md:px-3">
        <div>{children}</div>
      </ScrollArea>
      <ScrollArea className="h-[90vh] w-[280px] px-3 hidden xl:block">
        <div className="w-full">{rightSideBar}</div>
      </ScrollArea>
    </div>
  );
};

export default Layout;
