import { ScrollArea } from "@/components/ui/scroll-area";

const Page = () => {
  return (
    <div className="grid grid-cols-3 gap-4 justify-between">
      <ScrollArea className="col-span-2 h-[90vh] px-3">
        <div className=" bg-background">left side</div>
      </ScrollArea>
      <ScrollArea className="h-[90vh] px-3">
        <div className="bg-background">right side</div>
      </ScrollArea>
    </div>
  );
};

export default Page;
