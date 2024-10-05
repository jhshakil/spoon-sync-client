import { ScrollArea } from "@/components/ui/scroll-area";

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
    <div className="flex justify-between gap-4 mt-5">
      <ScrollArea className="h-[90vh] w-[280px] px-3">
        <div className="w-full">{leftSideBar}</div>
      </ScrollArea>
      <ScrollArea className="h-[90vh] flex-1 px-3">
        <div>{children}</div>
      </ScrollArea>
      <ScrollArea className="h-[90vh] w-[280px] px-3">
        <div className="bg-background  w-full">{rightSideBar}</div>
      </ScrollArea>
    </div>
  );
};

export default Layout;
