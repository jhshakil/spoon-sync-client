import DashboardNav from "@/components/shared/DashboardNav";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="bg-background mt-5 rounded-lg"
    >
      <ResizablePanel defaultSize={15} maxSize={20} minSize={10}>
        <ScrollArea className="h-[90vh]">
          <DashboardNav />
        </ScrollArea>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={80}>
        <ScrollArea className="h-[90vh]">{children}</ScrollArea>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default Layout;
