import type { Day } from "@/types/types";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import type { AddOrEditSubscriptionType } from "@/types/formType";
import type { Control } from "react-hook-form";
import type { ProductType } from "@/types/vendor";
import { useMemo } from "react";

interface DailyMenuSelectorProps {
  formControl: Control<AddOrEditSubscriptionType>;
  menuProducts: ProductType[];
  getProductName: (id: string) => ProductType | undefined;
  day: Day;
  dayIndex: number;
  selectedMenu: string[];
}

const DailyMenuSelector = ({
  day,
  dayIndex,
  formControl,
  menuProducts,
  getProductName,
  selectedMenu,
}: DailyMenuSelectorProps) => {
  const productName = useMemo(() => {
    const name = getProductName(selectedMenu[dayIndex])?.name || "Select";
    return name;
  }, [selectedMenu, dayIndex, getProductName]);

  return (
    <FormField
      key={day}
      control={formControl}
      name="weeklyMenu"
      render={({ field }) => {

        
        const handleProductSelection = (value: string) => {
          const newMenu = [...field.value];
          newMenu[dayIndex] = value === "none" ? "" : value;
          field.onChange(newMenu);
        };

        return (
          <FormItem>
            <div className="flex justify-between items-center">
              <FormLabel className="text-xs capitalize text-gray-700">
                {day}
              </FormLabel>
              <FormMessage />
            </div>
            <FormControl>
              <Select
                value={field.value[dayIndex] || ""}
                onValueChange={handleProductSelection}
              >
                <SelectTrigger className="border-amber-200 focus:border-amber-400 focus:ring-amber-200 h-9 w-full">
                  <SelectValue>{productName}</SelectValue>
                </SelectTrigger>
                <SelectContent position="popper" sideOffset={5}>
                  {selectedMenu[dayIndex] !== "" && (
                    <SelectItem value="none">Clear Selection</SelectItem>
                  )}
                  {menuProducts.map((p) => {
                    return (
                      <SelectItem key={p._id} value={p._id}>
                        {p.name}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </FormControl>
          </FormItem>
        );
      }}
    />
  );
};

export default DailyMenuSelector;
