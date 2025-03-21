import DashboardNav from "@/components/shared/DashboardNav";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
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
import { getCurrentUser } from "@/services/AuthService";
import { TUser } from "@/types/user.types";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getCurrentUser();
  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="bg-background mt-5 rounded-lg !flex-col lg:!flex-row gap-4"
    >
      <ResizablePanel
        defaultSize={15}
        maxSize={20}
        minSize={10}
        className="!basis-auto lg:!basis-0 hidden lg:block"
      >
        <ScrollArea className="h-[calc(100vh-95px)]">
          <DashboardNav user={user as TUser} />
        </ScrollArea>
      </ResizablePanel>
      <Drawer direction="left">
        <DrawerTrigger asChild className="lg:hidden w-[50px] mx-3 mt-4">
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
            <ScrollArea className="h-[calc(100vh-70px)] w-[280px] px-3">
              <div className="w-full">
                <DashboardNav user={user as TUser} />
              </div>
            </ScrollArea>
          </div>
        </DrawerContent>
      </Drawer>
      <ResizableHandle className="hidden lg:block" />
      <ResizablePanel defaultSize={80} className="!basis-auto lg:!basis-0">
        <ScrollArea className="h-[calc(100vh-95px)]">{children}</ScrollArea>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default Layout;
