import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Eye } from "lucide-react";

const CurrentPendingOrders = () => {
  return (
    <Card className="border-amber-200 shadow-sm bg-gradient-to-br from-amber-50 to-orange-50 gap-3 p-4">
      <CardHeader className="">
        <CardTitle className="text-lg font-semibold">Pending Orders</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <div className="bg-gradient-to-br from-amber-50/80 to-orange-50/60 border border-amber-200/60 p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 hover:border-amber-300/80 backdrop-blur-sm h-[170px] flex flex-col">
            {/* Order Header */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex gap-2 items-center">
                <Clock className="w-4 h-4 text-amber-600" />
                <h2 className="font-semibold text-amber-900 text-sm">
                  Order #234jl
                </h2>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs font-medium text-amber-900 bg-gradient-to-r from-amber-500/20 to-amber-600/20 px-2 py-1 rounded-md">
                  ₹450
                </span>
                <Button
                  size="sm"
                  variant="outline"
                  className="h-7 px-3 text-xs"
                >
                  <Eye className="w-3 h-3" />
                </Button>
              </div>
            </div>

            {/* Order Items - Limited Display */}
            <div className="flex-1 space-y-1.5 overflow-hidden">
              <div className="text-sm text-amber-800">
                • Paneer Tikka Masala (x2)
              </div>
              <div className="text-sm text-amber-800">
                • Butter Chicken (x1)
              </div>
              <div className="text-sm text-amber-800">• Naan Bread (x3)</div>
              <div className="text-xs text-amber-700/70 mt-2">
                +2 more items...
              </div>
            </div>

            {/* Order Footer */}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CurrentPendingOrders;
