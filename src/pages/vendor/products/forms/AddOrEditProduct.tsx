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
import { ADD_PRODUCT, UPDATE_PRODUCT } from "@/lib/routes";
import apiCLient from "@/lib/axios-client";
import { toast } from "sonner";
import type { vendorservices } from "@/types/types";
import ShowUploadedImage from "@/components/showUploadedImage";
import type { ProductType } from "@/types/vendor";

const AddOrEditProduct = ({
  setOpenService,
  editProduct,
}: {
  setOpenService: (service: vendorservices) => void;
  editProduct: ProductType | null;
}) => {
  const { addNewProduct, updateProduct } = useVendorStore();
  const inputRef = useRef<HTMLInputElement>(null);
  const [openImageWindow, setOpenImageWindow] = useState(false);

  const form = useForm<AddOrEditProductType>({
    resolver: zodResolver(addProductSchema),
    defaultValues: {
      name: editProduct?.name || "",
      description: editProduct?.description || "",
      price: editProduct?.price.toString() || "",
      category: editProduct?.category,
    },
  });

  const onSubmit = async (values: AddOrEditProductType) => {
    const formData = new FormData();
    try {
      if (editProduct) {
        if (editProduct.name !== values.name)
          formData.append("name", values.name);
        if (editProduct.price !== values.price)
          formData.append("price", values.price);
        if (editProduct.description !== values.description) {
          formData.append("description", values.description);
        }
        if (editProduct.category !== values.category)
          formData.append("category", values.category);
        if (values.photo instanceof File) {
          formData.append("file", values.photo);
        }
        if ([...formData.entries()].length === 0) {
          toast.info("No changes detected");
          return;
        }
        formData.append("_id", editProduct._id);

        const result = await apiCLient.patch(UPDATE_PRODUCT, formData, {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        });

        if (result.status === 200) {
          updateProduct(result.data.product);
          toast.success("Product Updated");
          setOpenService("viewProduct");
        }
      } else {
        formData.append("name", values.name);
        formData.append("price", values.price);
        formData.append("description", values.description);
        formData.append("category", values.category);
        if (values.photo instanceof File) {
          formData.append("file", values.photo);
        }

        const result = await apiCLient.post(ADD_PRODUCT, formData, {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        });
        if (result.status === 200) {
          addNewProduct(result.data.product);
          toast.success("Product Created");
          setOpenService("viewProduct");
        } else {
          toast.success("failed while creation");
        }
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
      <Card className="card-amber-gradient shadow-sm border-amber-200">
        <CardHeader className="border-b border-amber-200/50">
          <CardTitle className="text-xl flex items-center gap-3 text-gray-800">
            {!editProduct?.name ? "Add Product" : `Edit ${editProduct.name}`}
          </CardTitle>
          <CardDescription className="text-amber-700/70">
            {!editProduct?.name
              ? "Create a new product for your restaurant"
              : "Update your product details"}
          </CardDescription>
        </CardHeader>
        <CardContent className="">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              {/* Name, Price, Category */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 font-medium">
                        Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter product name"
                          {...field}
                          className="border-amber-200 focus:border-amber-400 focus:ring-amber-200"
                        />
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
                      <FormLabel className="text-gray-700 font-medium">
                        Price
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Enter price"
                          value={field.value}
                          onChange={field.onChange}
                          name={field.name}
                          className="border-amber-200 focus:border-amber-400 focus:ring-amber-200"
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
                    <FormItem className="space-y-3">
                      <FormLabel className="text-gray-700 font-medium">
                        Category
                      </FormLabel>
                      <FormControl>
                        <RadioGroup
                          value={field.value}
                          onValueChange={field.onChange}
                          className="flex gap-6"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem
                              value="veg"
                              id="veg"
                              className="text-amber-600 border-amber-300"
                            />
                            <Label htmlFor="veg" className="text-gray-700">
                              Veg
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem
                              value="non-veg"
                              id="non-veg"
                              className="text-amber-600 border-amber-300"
                            />
                            <Label htmlFor="non-veg" className="text-gray-700">
                              Non Veg
                            </Label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-medium">
                      Description
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter product description"
                        {...field}
                        className="border-amber-200 focus:border-amber-400 focus:ring-amber-200 min-h-[100px]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="photo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-medium">
                      Product Image
                    </FormLabel>
                    <div className="flex gap-3">
                      <FormControl>
                        <Input
                          type="file"
                          accept="image/*"
                          ref={(el) => {
                            inputRef.current = el;
                            field.ref(el);
                          }}
                          value={undefined}
                          placeholder="Choose product image"
                          onChange={async (e) => {
                            const file = e.target.files?.[0];
                            field.onChange(file);

                            if (file) {
                              setTimeout(async () => {
                                await form.trigger("photo");
                              }, 0);
                            }
                          }}
                          className="border-amber-200 focus:border-amber-400 focus:ring-amber-200"
                        />
                      </FormControl>
                      <div className="flex gap-2">
                        {(form.getValues().photo || editProduct) && (
                          <Button
                            variant="outline"
                            type="button"
                            onClick={() => {
                              setOpenImageWindow(true);
                            }}
                            className="border-amber-300 text-amber-700 hover:bg-amber-50"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                        )}

                        {form.getValues().photo && (
                          <Button
                            variant="outline"
                            type="button"
                            onClick={() => {
                              field.onChange(null);
                              if (inputRef.current) {
                                inputRef.current.value = "";
                              }
                            }}
                            className="border-red-300 text-red-700 hover:bg-red-50"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-amber-500 hover:bg-amber-600 text-white font-medium py-2"
              >
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
