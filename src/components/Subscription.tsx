import useVendorStore from "@/store/store";
import type { Subscription } from "@/types/vendor";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Check, TrendingDown } from "lucide-react";
import CategoryBadge from "./CategoryBadge";
import { format } from "date-fns";
import { days } from "@/lib/utils";
import { Badge } from "./ui/badge";

const SubscriptionCard = ({
  subscription,
  isSelected,
  onToggle,
}: {
  subscription: Subscription;
  isSelected: boolean;
  onToggle: () => void;
}) => {
  const { products } = useVendorStore();

  const getDurationText = (duration: "1m" | "3m" | "6m" | "12m") => {
    const map = {
      "1m": "1 Month",
      "3m": "3 Months",
      "6m": "6 Months",
      "12m": "12 Months",
    };
    return map[duration] || duration;
  };

  const getProduct = (productId: string) => {
    return products.find((p) => p._id === productId);
  };

  const allProducts = days.map((day) => getProduct(subscription[day]));

  return (
    <Card
      className={`transition-all duration-200 cursor-pointer ${
        isSelected
          ? "bg-amber-50 border-amber-400 shadow-md"
          : "border-amber-200 hover:border-amber-300 hover:shadow-sm"
      }`}
      onClick={onToggle}
    >
      <CardHeader className="">
        <div className="flex justify-between items-start gap-2">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-base text-gray-900 truncate mb-1">
              {subscription.name}
            </h3>
            <div className="flex items-center gap-1.5 flex-wrap">
              <CategoryBadge category={subscription.category} />
              <Badge
                variant="outline"
                className="bg-amber-100 text-amber-700 border-amber-300 hover:bg-amber-100 text-[10px] px-1.5 py-0 h-5 capitalize"
              >
                {subscription.mealTime}
              </Badge>
              <Badge
                variant="outline"
                className="bg-blue-50 text-blue-700 border-blue-300 hover:bg-blue-50 text-[10px] px-1.5 py-0 h-5"
              >
                {getDurationText(subscription.duration)}
              </Badge>
            </div>
          </div>
          <div
            className={`w-5 h-5 border-2 rounded flex items-center justify-center flex-shrink-0 transition-all ${
              isSelected ? "border-amber-500 bg-amber-500" : "border-gray-300"
            }`}
          >
            {isSelected && <Check className="h-3 w-3 text-white" />}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-2">
        <div className="bg-gray-50 rounded p-2 border border-gray-200">
          <div className="flex flex-wrap gap-x-1 gap-y-0.5 text-[11px] text-gray-700">
            {allProducts.map((product, idx) => (
              <span key={idx}>
                {product?.name}
                {idx < allProducts.length - 1 && (
                  <span className="text-gray-400 ml-1">•</span>
                )}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-amber-600">
              ₹{subscription.price}
            </span>
            {subscription.save > 0 && (
              <div className="flex items-center gap-0.5 text-green-600">
                <TrendingDown className="w-3 h-3" />
                <span className="text-xs font-medium">
                  ₹{subscription.save}
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3 text-[10px] text-gray-500 pt-1 border-t border-gray-200">
          <div className="flex items-center gap-0.5">
            <span>Created At :</span>

            <span>
              {format(new Date(subscription.createdAt), "MMM dd, yyyy")}
            </span>
          </div>
          <div className="flex items-center gap-0.5">
            <span>Last Modified :</span>
            <span>
              {format(new Date(subscription.createdAt), "MMM dd, yyyy")}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SubscriptionCard;
