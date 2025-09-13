import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import useVendorStore from "@/store/store";
import { addProductSchema, type AddOrEditProductType } from "@/types/formType";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRef, useState } from "react";
import { Eye, X } from "lucide-react";
import { ADD_PRODUCT } from "@/lib/routes";
import apiCLient from "@/lib/axios-client";
import { toast } from "sonner";
import type { vendorservices } from "@/types/types";
import ShowUploadedImage from "@/components/showUploadedImage";

const AddOrEditProduct = ({
  setOpenService,
}: {
  setOpenService: (service: vendorservices) => void;
}) => {
  const { editProduct } = useVendorStore();
  const inputRef = useRef<HTMLInputElement>(null);
  const [openImageWindow, setOpenImageWindow] = useState(false);

  const form = useForm<AddOrEditProductType>({
    resolver: zodResolver(addProductSchema),
    defaultValues: {
      name: editProduct?.name || "",
      description: editProduct?.description || "",
      price: editProduct?.price,
      category: editProduct?.category,
    },
  });

  const onSubmit = async (values: AddOrEditProductType) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("price", values.price);
    formData.append("description", values.description);
    formData.append("category", values.category);
    formData.append("file", values.photo);
    console.log("Form submitted:", values);

    try {
      const result = await apiCLient.post(ADD_PRODUCT, formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (result.status === 200) {
        toast.success("Product Created");
        setOpenService("viewProduct");
      } else {
        toast.success("failed while creation");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getImageUrl = () => {
    const photo = form.getValues().photo;

    if (photo instanceof File) {
      return URL.createObjectURL(photo);
    }

    return editProduct?.imageUrl || "";
  };

  return (
    <div className="p-4 relative">
      <Card className="p-4">
        <CardHeader>
          <CardTitle className="text-xl">
            {!editProduct?.name ? "Add Prodcut" : `Edit ${editProduct.name}`}
          </CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* Name, Price, Category */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter product name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Enter price"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem className="flex gap-4">
                      <FormLabel>Choose Category</FormLabel>
                      <FormControl>
                        <RadioGroup
                          value={field.value}
                          onValueChange={field.onChange}
                          className="flex gap-6"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="veg" id="veg" />
                            <Label htmlFor="veg">Veg</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="non-veg" id="non-veg" />
                            <Label htmlFor="non-veg">Non Veg</Label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Description */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter product description"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Image URL */}
              <FormField
                control={form.control}
                name="photo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image</FormLabel>
                    <div className="flex gap-2 ">
                      <FormControl>
                        <Input
                          type="file"
                          accept="image/"
                          ref={(el) => {
                            inputRef.current = el;
                            field.ref(el);
                          }}
                          value={undefined}
                          placeholder="https://example.com/image.jpg"
                          onChange={async (e) => {
                            const file = e.target.files?.[0];
                            field.onChange(file);

                            if (file) {
                              setTimeout(async () => {
                                await form.trigger("photo");
                              }, 0);
                            }
                          }}
                        />
                      </FormControl>
                      {form.getValues().photo && (
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            type="button"
                            onClick={() => {
                              setOpenImageWindow(true);
                            }}
                          >
                            <Eye />
                          </Button>

                          <Button
                            variant="outline"
                            className="text-xs sm:text-sm"
                            type="button"
                            onClick={() => {
                              field.onChange(null);
                              if (inputRef.current) {
                                inputRef.current.value = "";
                              }
                            }}
                          >
                            <X />
                          </Button>
                        </div>
                      )}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <Button type="submit" className="w-full" variant="primary">
                {editProduct ? "Update Product" : "Add Product"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {openImageWindow && (
        <ShowUploadedImage
          image={getImageUrl()}
          close={() => setOpenImageWindow(false)}
        />
      )}
    </div>
  );
};

export default AddOrEditProduct;
