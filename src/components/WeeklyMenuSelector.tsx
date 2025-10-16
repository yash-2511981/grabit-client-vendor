import useVendorStore from "@/store/store";
import { useEffect, useMemo } from "react";
import type { Day } from "@/types/types";
import { days } from "@/lib/utils";
import { useWatch, type Control } from "react-hook-form";
import type { AddOrEditSubscriptionType } from "@/types/formType";
import type { ProductType, Subscription } from "@/types/vendor";
import DailyMenuSelector from "./DailyMenuSelector";

interface WeeklyMenuSelectorProps {
  formControl: Control<AddOrEditSubscriptionType>;
  price: number;
  duration: string;
  setSavingValue: (value: number) => void;
  editSubscription?: Subscription;
}

const WeeklyMenuSelector = ({
  formControl,
  price,
  duration,
  setSavingValue,
}: WeeklyMenuSelectorProps) => {
  const { products } = useVendorStore();

  const selectedMenuIds = useWatch({
    control: formControl,
    name: days,
  });

  const selectedMenu: Record<Day, string> = useMemo(() => {
    const menu: Record<Day, string> = {
      sunday: "",
      monday: "",
      tuesday: "",
      wednesday: "",
      thursday: "",
      friday: "",
      saturday: "",
    };
    days.forEach((day, index) => {
      menu[day] = selectedMenuIds?.[index] || "";
    });
    return menu;
  }, [selectedMenuIds]);

  const weeks = useMemo(() => {
    if (duration === "3m") return 12;
    if (duration === "6m") return 24;
    if (duration === "12m") return 48;
    return 4;
  }, [duration]);

  const costPerDish = useMemo(() => {
    const array = Object.values(selectedMenu).filter((id) => id !== "");
    const cost = products.reduce((initial, p) => {
      if (array.includes(p._id)) {
        return initial + Number(p.price);
      }
      return initial;
    }, 0);

    const monthlyCost = cost * weeks;
    const savingInRupee = monthlyCost - price;
    const savingInPercent =
      monthlyCost > 0 ? Math.floor((savingInRupee / monthlyCost) * 100) : 0;

    return {
      monthlyCost,
      savingInRupee,
      savingInPercent,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedMenu, price, duration]);

  useEffect(() => {
    setSavingValue(costPerDish.savingInRupee);
  }, [costPerDish.savingInRupee, setSavingValue]);

  const getProductName = (id: string) => {
    console.log("i am here");
    return products.find((p) => p._id === id) || undefined;
  };

  const menuProducts: ProductType[] = useMemo(() => {
    const filterProducts = products.filter(
      (p) => !selectedMenuIds.includes(p._id)
    );

    return filterProducts;
  }, [products, selectedMenuIds]);

  return (
    <div className="space-y-2">
      <p className="text-sm font-medium border-b border-amber-200/50 pb-1">
        Weekly Menu
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
        {days.map((d) => (
          <DailyMenuSelector
            key={d}
            getProductName={getProductName}
            menuProducts={menuProducts}
            selectedMenu={selectedMenu}
            formControl={formControl}
            day={d}
          />
        ))}
        {costPerDish.monthlyCost > 0 && (
          <div className="text-xs font-medium text-gray-700 flex flex-col items-start justify-end">
            <span>Individual Dish Cost: ₹{costPerDish.monthlyCost}</span>
            <div className="flex gap-2 items-center justify-start w-full">
              <span>
                Total Savings: ₹
                {costPerDish.savingInRupee > 0
                  ? costPerDish.savingInRupee
                  : "0"}
              </span>
              <span className="text-xs text-green-600">
                {costPerDish.savingInPercent > 0
                  ? costPerDish.savingInPercent
                  : 0}
                % discount
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeeklyMenuSelector;
