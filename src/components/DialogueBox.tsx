import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface DialogBoxProps {
  setOpen: (value: boolean) => void;
  action: () => void;
}

const DialogBox = ({ setOpen, action }: DialogBoxProps) => {
  return (
    <div className={cn("max-w-lg w-full")}>
      <p className="p-3 font-semibold text-muted-foreground">
        Are you sure? This action cant be undone.
      </p>
      <div className="w-full flex justify-end gap-2 px-4">
        <Button
          variant="primary"
          onClick={() => {
            action();
            setOpen(false);
          }}
        >
          Confirm
        </Button>
        <Button variant="outline" onClick={() => setOpen(false)}>
          Cancle
        </Button>
      </div>
    </div>
  );
};

export default DialogBox;
