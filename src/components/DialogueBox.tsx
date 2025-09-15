import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface DialogBoxProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  action: () => void;
}

const DialogBox = ({ open, setOpen, action }: DialogBoxProps) => {
  return (
    <div
      className={cn(
        "absolute bottom-5 right-5 bg-gray-100 rounded-2xl shadow-lg transition-all ease-linear duration-1000 max-w-lg",
        { "w-full h-[100px]": open, "w-0 h-0": !open }
      )}
    >
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
