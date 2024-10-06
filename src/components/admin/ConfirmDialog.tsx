import { Button, buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  titleMessage: string;
  descriptionMessage: string;
  onSubmit: () => void;
};

const ConfirmDialog = ({
  children,
  titleMessage,
  descriptionMessage,
  onSubmit,
}: Props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{titleMessage}</DialogTitle>
          <DialogDescription>{descriptionMessage}</DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose className={cn(buttonVariants({ variant: "secondary" }))}>
            Cancel
          </DialogClose>
          <DialogClose
            className={cn(buttonVariants())}
            onClick={() => onSubmit()}
          >
            Confirm
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmDialog;
