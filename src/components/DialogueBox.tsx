import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface DialogBoxProps {
  setOpen: (value: boolean) => void;
  onConfirm: () => void;
  itemCount: number; // New prop: count of items selected
  itemType: string; // New prop: e.g., "subscriptions"
}

const DialogBox = ({
  setOpen,
  onConfirm,
  itemCount,
  itemType,
}: DialogBoxProps) => {
  // Determine singular/plural form for clarity
  const itemLabel = itemCount === 1 ? itemType.slice(0, -1) : itemType;

  return (
    <div className={cn("max-w-lg w-full p-4 space-y-4")}>
      {/* Enhanced Header */}
      <h3 className="text-xl font-bold text-gray-800">Confirm Action</h3>

      <p className="font-semibold text-gray-700">
        You are about to permanently delete{" "}
        <strong className="text-amber-700">
          {itemCount} {itemLabel}
        </strong>
        .
      </p>

      {/* Clear Warning with Amber Emphasis */}
      <p className="text-sm text-muted-foreground italic">
        <span className="font-bold text-amber-600">Please Note:</span> This
        action is irreversible and cannot be undone.
      </p>

      <div className="w-full flex justify-end gap-3 pt-2">
        <Button
          variant="primary"
          onClick={() => {
            onConfirm();
            setOpen(false);
          }}
        >
          Confirm Delete
        </Button>

        <Button variant="outline" onClick={() => setOpen(false)}>
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default DialogBox;
