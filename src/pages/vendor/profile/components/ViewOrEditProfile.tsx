import RestaurantImage from "@/components/ProfileImage";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
  SelectTrigger,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import useApi from "@/hooks/useApi";
import { UPDATE_PERSONAL_DETAILS } from "@/lib/routes";
import useVendorStore from "@/store/store";
import {
  viewOrEditPersonalDetailsSchema,
  type ViewOrEditPersonalDetailsSchema,
} from "@/types/formType";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditIcon, VerifiedIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const ViewOrEditProfile = () => {
  const { vendor, setVendor } = useVendorStore();
  const [isEditing, setIsEditting] = useState<boolean>(false);
  const { patch } = useApi();

  const form = useForm<ViewOrEditPersonalDetailsSchema>({
    resolver: zodResolver(viewOrEditPersonalDetailsSchema),
    defaultValues: {
      name: vendor?.name,
      email: vendor?.email,
      address: vendor?.address,
      category: vendor?.category,
      phone: vendor?.phone,
      pincode: vendor?.pincode.toString(),
      ownerName: vendor?.ownerName,
      ownerEmail: vendor?.ownerEmail,
      ownerContact: vendor?.ownerContact,
    },
  });

  const updateDetails = async (data: ViewOrEditPersonalDetailsSchema) => {
    setIsEditting(!isEditing);

    const vendorDataForComparison = {
      name: vendor?.name,
      email: vendor?.email,
      address: vendor?.address,
      category: vendor?.category,
      phone: vendor?.phone,
      pincode: vendor?.pincode?.toString(),
      ownerName: vendor?.ownerName,
      ownerEmail: vendor?.ownerEmail,
      ownerContact: vendor?.ownerContact,
    };

    if (JSON.stringify(data) === JSON.stringify(vendorDataForComparison)) {
      toast.info("There is no change in personal details");
      return;
    }
    const result = await patch(
      UPDATE_PERSONAL_DETAILS,
      data,
      "Profile Updated"
    );

    if (result?.success) {
      setVendor(result.data.restaurant);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex gap-3 items-center">
          <RestaurantImage />
          <div className="">
            <CardTitle className="text-xl flex gap-1 font-bold">
              Dhaba Dhaba
              <span className="text-yellow-600 flex items-center text-sm font-semibold gap-1">
                <VerifiedIcon size={20} />
              </span>
            </CardTitle>

            <CardDescription className="text-sm">
              yash@gmail.com
            </CardDescription>
          </div>
        </div>
        <CardAction>
          {isEditing ? (
            <Button
              className=""
              variant="primary"
              onClick={form.handleSubmit(updateDetails)}
            >
              Update
            </Button>
          ) : (
            <EditIcon onClick={() => setIsEditting(!isEditing)} />
          )}
        </CardAction>
      </CardHeader>
      <CardContent className="flex flex-col">
        <Form {...form}>
          <form className="space-y-3">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex gap-3">
                      <FormLabel>Restaurant Name</FormLabel>
                      <FormMessage className="text-xs" />
                    </div>
                    <FormControl>
                      <Input {...field} type="text" disabled={!isEditing} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex gap-3">
                      <FormLabel>Restaurant email</FormLabel>
                      <FormMessage className="text-xs" />
                    </div>
                    <FormControl>
                      <Input {...field} type="text" disabled={!isEditing} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex gap-3">
                      <FormLabel>Contact No</FormLabel>
                      <FormMessage className="text-xs" />
                    </div>
                    <FormControl>
                      <Input {...field} type="text" disabled={!isEditing} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
              <FormField
                control={form.control}
                name="ownerEmail"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex gap-3">
                      <FormLabel>Owner Email</FormLabel>
                      <FormMessage className="text-xs" />
                    </div>
                    <FormControl>
                      <Input {...field} type="text" disabled={!isEditing} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="ownerContact"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex gap-3">
                      <FormLabel>Owner Contact No</FormLabel>
                      <FormMessage className="text-xs" />
                    </div>
                    <FormControl>
                      <Input {...field} type="text" disabled={!isEditing} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="ownerName"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex gap-3 items-center">
                      <FormLabel>Owner Name</FormLabel>
                      <FormMessage className="text-xs" />
                    </div>
                    <FormControl>
                      <Input {...field} type="text" disabled={!isEditing} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-3">
              <div className="flex flex-col gap-3 h-full">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Choose Category :</FormLabel>
                      <FormControl>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                          disabled={!isEditing}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select category" />
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
                  name="pincode"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex gap-3 items-center">
                        <FormLabel>Pincode</FormLabel>
                        <FormMessage />
                      </div>
                      <FormControl>
                        <Input {...field} type="text" disabled={!isEditing} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <div className="h-full">
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem className="h-full flex flex-col">
                      <div className="flex gap-3 items-center">
                        <FormLabel>Address</FormLabel>
                        <FormMessage />
                      </div>
                      <FormControl className="flex-1">
                        <Textarea
                          {...field}
                          className="h-full resize-none"
                          disabled={!isEditing}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ViewOrEditProfile;
