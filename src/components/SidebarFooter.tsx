import useApi from "@/hooks/useApi";
import { SIGN_OUT, UPDATE_STATUS } from "@/lib/routes";
import useVendorStore from "@/store/store";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import { Switch } from "./ui/switch";

const SidebarFooter = () => {
  const { vendor, logout, setOpen, open } = useVendorStore();
  const { get, patch } = useApi();

  const handlLogout = async () => {
    try {
      const response = await get(SIGN_OUT);
      if (response?.success) {
        logout();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSwitchClick = async (checked: boolean) => {
    const successMessage = checked ? "Ready to receive orders!" : "You're offline.";
    const result = await patch(
      UPDATE_STATUS,
      { status: checked },
      successMessage
    );
    if (result?.success && vendor) {
      setOpen(checked);
    }
  };
  return (
    <div className="mt-auto p-3 space-y-3  border-amber-300/60">
      {/* Status indicator */}
      <div className="flex items-center justify-between p-3 bg-gradient-to-r from-amber-100/80 to-orange-100/70 border border-amber-300/50 rounded-lg shadow-sm backdrop-blur-sm">
        <div className="flex items-center gap-2">
          {open && (
            <div className="w-2.5 h-2.5 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full  shadow-md ring-2 ring-amber-200/50"></div>
          )}
          {!open && (
            <div className="w-2.5 h-2.5 bg-gradient-to-r from-red-400 to-red-500 rounded-full  shadow-md ring-2 ring-red-200/50"></div>
          )}
          <span className="text-sm font-semibold text-amber-900">
            {open ? "Open" : "Closed"}
          </span>
        </div>
        <Switch
          id="go_live"
          className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-amber-500 data-[state=checked]:to-amber-600"
          onCheckedChange={handleSwitchClick}
        />
      </div>

      <Button
        variant="outline"
        onClick={handlLogout}
        className="w-full justify-start bg-gradient-to-r from-amber-50/90 to-orange-50/80 border-amber-300/60 text-amber-800 hover:bg-gradient-to-r hover:from-amber-100/90 hover:to-orange-100/80 hover:border-amber-400/80 hover:text-amber-900 shadow-sm hover:shadow-md transition-all duration-300 font-medium"
        size="sm"
      >
        <LogOut className="w-4 h-4 mr-2" />
        Sign Out
      </Button>
    </div>
  );
};

export default SidebarFooter;
