import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings } from "lucide-react";

const AccountSettings = () => {
  return (
    <Card className="card-amber-gradient h-full">
      <CardHeader>
        <CardTitle className="text-lg flex font-bold items-center gap-3">
          <div className="w-10 h-10 bg-amber-200 text-amber-600 flex items-center justify-center rounded-full">
            <Settings />
          </div>{" "}
          Account Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="">
        
      </CardContent>
    </Card>
  );
};

export default AccountSettings;
