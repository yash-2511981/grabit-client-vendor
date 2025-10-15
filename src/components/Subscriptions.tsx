import useVendorStore from "@/store/store";
import { Calendar, Check, TrendingDown } from "lucide-react";
import CategoryBadge from "./CategoryBadge";
import { days } from "@/lib/utils";

interface SubscriptionProps {
  selectSubscription: (id: string) => void;
  deselectSubscription: (id: string) => void;
  selectedSubscriptions: string[];
}

const Subscriptions = ({
  selectSubscription,
  deselectSubscription,
  selectedSubscriptions,
}: SubscriptionProps) => {
  const { subscriptions, products } = useVendorStore();

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

  return (
    <div className="flex flex-col gap-2">
      {subscriptions.map((subscription) => {
        const allProducts = days.map((day) => getProduct(subscription[day]));

        return (
          <div
            key={subscription._id}
            className={`border rounded-lg p-4 transition-all duration-200 cursor-pointer ${
              selectedSubscriptions.includes(subscription._id)
                ? "bg-amber-50 border-amber-400 shadow-md"
                : "bg-white border-amber-200 hover:border-amber-300 hover:shadow-sm"
            }`}
            onClick={() => {
              if (selectedSubscriptions.includes(subscription._id)) {
                deselectSubscription(subscription._id);
              } else {
                selectSubscription(subscription._id);
              }
            }}
          >
            <div className="flex justify-between items-start mb-3">
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-gray-900 mb-1">
                  {subscription.name}
                </h3>
              </div>
              <div
                className={`w-6 h-6 border-2 rounded flex items-center justify-center transition-all ${
                  selectedSubscriptions.includes(subscription._id)
                    ? "border-amber-500 bg-amber-500"
                    : "border-gray-300"
                }`}
              >
                {selectedSubscriptions.includes(subscription._id) && (
                  <Check className="h-4 w-4 text-white" />
                )}
              </div>
            </div>

            <div className="flex items-center gap-2 mb-3">
              <CategoryBadge category={subscription.category} />
              <span className="px-2 py-1 text-xs font-medium rounded-full bg-amber-100 text-amber-700 border border-amber-300 capitalize">
                {subscription.mealTime}
              </span>
            </div>

            <div className="mb-3 bg-gray-50 rounded-lg p-2 border border-gray-200">
              <p className="text-xs font-medium text-gray-600 mb-1">
                Weekly Menu:
              </p>
              <div className="flex flex-wrap gap-1">
                <span className="text-gray-400">•</span>
                {allProducts.map((product, idx) => (
                  <div key={idx} className="flex items-center gap-1">
                    <span className="text-xs text-gray-700">
                      {product?.name}
                    </span>
                    {idx < allProducts.length - 1 && (
                      <span className="text-gray-400">•</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div>
                  <span className="text-2xl font-bold text-amber-600">
                    ₹{subscription.price}
                  </span>
                  <span className="text-xs text-gray-500 ml-1">
                    /{getDurationText(subscription.duration)}
                  </span>
                </div>
                {subscription.save > 0 && (
                  <div className="flex items-center gap-1 text-green-600">
                    <TrendingDown className="w-4 h-4" />
                    <span className="text-sm font-medium">
                      Save ₹{subscription.save}
                    </span>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-1 text-gray-600">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">
                  {getDurationText(subscription.duration)}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Subscriptions;
