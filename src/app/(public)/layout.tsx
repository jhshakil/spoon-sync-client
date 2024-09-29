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
      <div className="bg-background w-[280px] h-full">{leftSideBar}</div>
      <ScrollArea className="h-[90vh] flex-1 px-3">
        <div className="bg-background h-[200vh]">{children}</div>
      </ScrollArea>

      <div className="bg-background w-[280px] h-full">{rightSideBar}</div>
    </div>
  );
};

export default Layout;
