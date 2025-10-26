import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  addOrEditSubscriptionSchema,
  type AddOrEditSubscriptionType,
} from "@/types/formType";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { vendorservices } from "@/types/types";
import useApi from "@/hooks/useApi";
import { ADD_SUBSCRIPTION, UPDATE_SUBSCRIPTION } from "@/lib/routes";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import WeeklyMenuSelector from "@/components/WeeklyMenuSelector";
import useVendorStore from "@/store/store";
import type { Subscription } from "@/types/vendor";
import { toast } from "sonner";

const AddOrEditSubscriptions = ({
  setOpenService,
  editSubscription,
}: {
  setOpenService: (service: vendorservices) => void;
  editSubscription: Subscription | undefined;
}) => {
  const { addSubscription, updateSubscription } = useVendorStore();
  const { post } = useApi();

  const form = useForm<AddOrEditSubscriptionType>({
    resolver: zodResolver(addOrEditSubscriptionSchema),
    defaultValues: {
      name: editSubscription?.name,
      duration: editSubscription?.duration,
      weeklyMenu: editSubscription?.weeklyMenu || Array(7).fill(""),
      price: editSubscription?.price.toString() || "0",
      mealTime: editSubscription?.mealTime,
      category: editSubscription?.category,
    },
  });

  const onSubmit = async (data: AddOrEditSubscriptionType) => {
    
    const isEdit = !!editSubscription;
    

    //check any changes are made while editing
    if (isEdit) {
      const noChanges =
        editSubscription.name === data.name &&
        editSubscription.price.toString() === data.price &&
        editSubscription.category === data.category &&
        editSubscription.duration === data.duration &&
        editSubscription.mealTime === data.mealTime &&
        JSON.stringify(editSubscription.weeklyMenu) ===
          JSON.stringify(data.weeklyMenu);

      if (noChanges) {
        toast.info("No changed detected");
        setOpenService("allSubscriptions");
        return;
      }
    }

    const url = isEdit ? UPDATE_SUBSCRIPTION : ADD_SUBSCRIPTION;
    const successMsg = isEdit
      ? "Subscription Updated"
      : "New Subscription Added";

    const subscriptionData = isEdit
      ? { _id: editSubscription._id, ...data }
      : data;

    const result = await post(url, subscriptionData, successMsg);
    if (result?.success) {
      if (isEdit) updateSubscription(result.data.subscription);
      else addSubscription(result.data.subscription);
    }

    setOpenService("allSubscriptions");
  };

  const watchedPrice = useWatch({
    control: form.control,
    name: "price",
  });

  const watchedDuration = useWatch({
    control: form.control,
    name: "duration",
  });

  return (
    <Card className="card-amber-gradient shadow-sm border-amber-200 h-fit">
      <CardHeader className="border-b border-amber-200/50">
        <CardTitle className="text-xl text-gray-800">
          {!editSubscription?.name
            ? "Add Subscription"
            : `Edit ${editSubscription.name}`}
        </CardTitle>
        <CardDescription className="text-amber-700/70 text-sm">
          {!editSubscription?.name
            ? "Create a new subscription"
            : "Update the subscription details"}
        </CardDescription>
      </CardHeader>
      <CardContent className="relative">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <div className="flex justify-between items-center">
                      <FormLabel className="text-gray-700 text-sm">
                        Subscription Name
                      </FormLabel>
                      <FormMessage className="text-xs" />
                    </div>
                    <FormControl>
                      <Input
                        placeholder="Enter subscription name"
                        {...field}
                        className="border-amber-200 focus:border-amber-400 focus:ring-amber-200 h-9"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex justify-between items-center">
                      <FormLabel className="text-gray-700 text-sm">
                        Price
                      </FormLabel>
                      <FormMessage className="text-xs" />
                    </div>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Enter price"
                        value={field.value}
                        onChange={field.onChange}
                        name={field.name}
                        className="border-amber-200 focus:border-amber-400 focus:ring-amber-200 h-9"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <FormField
                control={form.control}
                name="mealTime"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex justify-between items-center">
                      <FormLabel className="text-gray-700 text-sm">
                        Meal Time
                      </FormLabel>
                      <FormMessage className="text-xs" />
                    </div>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="border-amber-200 focus:border-amber-400 focus:ring-amber-200 h-9 w-full">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="breakfast">Breakfast</SelectItem>
                          <SelectItem value="lunch">Lunch</SelectItem>
                          <SelectItem value="dinner">Dinner</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex justify-between items-center">
                      <FormLabel className="text-gray-700 text-sm">
                        Category
                      </FormLabel>
                      <FormMessage className="text-xs" />
                    </div>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="border-amber-200 focus:border-amber-400 focus:ring-amber-200 h-9 w-full">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="veg">Veg</SelectItem>
                          <SelectItem value="non-veg">Non Veg</SelectItem>
                          <SelectItem value="both">Both</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex justify-between items-center">
                      <FormLabel className="text-gray-700 text-sm">
                        Duration
                      </FormLabel>
                      <FormMessage className="text-xs" />
                    </div>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="border-amber-200 focus:border-amber-400 focus:ring-amber-200 h-9 w-full">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1m">1 Month</SelectItem>
                          <SelectItem value="3m">3 Months</SelectItem>
                          <SelectItem value="6m">6 Months</SelectItem>
                          <SelectItem value="12m">12 Months</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <WeeklyMenuSelector
              setSavingValue={(value) => form.setValue("save", value)}
              formControl={form.control}
              price={Number(watchedPrice || 0)}
              duration={watchedDuration}
              editSubscription={editSubscription}
            />

            <Button
              type="submit"
              className="w-full bg-amber-500 hover:bg-amber-600 text-white font-medium mt-1"
            >
              {editSubscription ? "Update Subscription" : "Create Subscription"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default AddOrEditSubscriptions;
