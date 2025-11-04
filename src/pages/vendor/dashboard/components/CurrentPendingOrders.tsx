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
            <div className="bg-gradient-to-br from-amber-50/80 to-orange-50/60 border border-amber-200/60 p-3 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 hover:border-amber-300/80 backdrop-blur-sm h-auto flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between mb-3 gap-2">
                  <div className="flex gap-2 items-center min-w-0 flex-1">
                    <Clock className="w-4 h-4 text-amber-600 flex-shrink-0" />
                    <h2 className="font-semibold text-amber-900 text-sm truncate">
                      {o._id}
                    </h2>
                  </div>
                </div>

                <div className="space-y-1">
                  {o.products.slice(0, 2).map((p, idx) => (
                    <div className="text-sm text-amber-800" key={idx}>
                      • {p.name} (x{p.quantity})
                    </div>
                  ))}
                  {o.products.length > 2 && (
                    <div className="text-xs text-amber-700/70 mt-1">
                      +{o.products.length - 2} more products
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-2 pt-2 border-t border-amber-200/50 flex justify-between">
                <span className="text-xs px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 capitalize flex items-center justify-center">
                  {o.status}
                </span>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="text-xs font-medium text-amber-900 bg-gradient-to-r from-amber-500/20 to-amber-600/20 px-2 py-1 rounded-md whitespace-nowrap">
                    ₹{o.amount}
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
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CurrentPendingOrders;
