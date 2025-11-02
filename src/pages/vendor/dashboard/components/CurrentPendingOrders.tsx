import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Eye } from "lucide-react";
import useVendorStore from "@/pages/vendor/store/store";

const CurrentPendingOrders = () => {
  const { pendingOrders } = useVendorStore();

  return (
    <Card className="border-amber-200 shadow-sm bg-gradient-to-br from-amber-50 to-orange-50 gap-3 p-4">
      <CardHeader className="">
        <CardTitle className="text-lg font-semibold">Pending Orders</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {pendingOrders.map((o) => (
            <div className="bg-gradient-to-br from-amber-50/80 to-orange-50/60 border border-amber-200/60 p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 hover:border-amber-300/80 backdrop-blur-sm h-[170px] flex flex-col">
              {/* Order Header */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex gap-2 items-center">
                  <Clock className="w-4 h-4 text-amber-600" />
                  <h2 className="font-semibold text-amber-900 text-sm w-[90%] truncate">
                    {o._id}
                  </h2>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-medium text-amber-900 bg-gradient-to-r from-amber-500/20 to-amber-600/20 px-2 py-1 rounded-md">
                    {o.amount}
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
                {o.products.slice(0, 2).map((p) => (
                  <div className="text-sm text-amber-800">
                    • {p.name} (x{p.quantity})
                  </div>
                ))}
                <div className="text-xs text-amber-700/70 mt-2">
                  {o.products.length > 3
                    ? `+${o.products.length - 3} more products`
                    : ""}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CurrentPendingOrders;
