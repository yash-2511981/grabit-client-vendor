import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import UpdatePasswordModal from "@/components/UpdatePasswordModal";
import useApi from "@/hooks/useApi";
import { UPDATE_PERMISSIONS } from "@/lib/routes";
import useVendorStore from "@/store/store";
import { Settings } from "lucide-react";

const AccountSettings = () => {
  const { vendor, setVendor } = useVendorStore();
  const { post } = useApi();

  const updateSettings = async (name: string, value: boolean) => {
    console.log(name, value);
    const result = await post(
      UPDATE_PERMISSIONS,
      { name, value },
      "Permission updated"
    );
    if (result?.success) {
      console.log(result.data);
      setVendor(result.data.restaurant);
    }
  };

  return (
    <Card className="card-amber-gradient h-fit">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex font-bold items-center gap-3">
          <div className="w-10 h-10 bg-amber-200 text-amber-600 flex items-center justify-center rounded-full">
            <Settings />
          </div>{" "}
          Account Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2 pt-0">
        <div className="py-2 px-3 rounded-lg bg-white/60 border border-amber-200/50 hover:bg-white/80 hover:shadow-sm transition-all duration-300 flex justify-between items-center">
          <span className="text-sm text-gray-700">Email Notifications</span>
          <Switch
            checked={vendor?.emailNotify}
            className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-amber-500 data-[state=checked]:to-amber-600"
            onCheckedChange={(checked) =>
              updateSettings("emailNotify", checked)
            }
          />
        </div>
        <div className="py-2 px-3 rounded-lg bg-white/60 border border-amber-200/50 hover:bg-white/80 hover:shadow-sm transition-all duration-300 flex justify-between items-center">
          <span className="text-sm text-gray-700">SMS Notifications</span>
          <Switch
            checked={vendor?.smsNotify}
            className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-amber-500 data-[state=checked]:to-amber-600"
            onCheckedChange={(checked) => updateSettings("smsNotify", checked)}
          />
        </div>
        <UpdatePasswordModal />
      </CardContent>
    </Card>
  );
};

export default AccountSettings;
