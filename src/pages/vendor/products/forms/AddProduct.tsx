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
import { addProductSchema, type ProductType } from "@/types/formType";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const AddOrEditProduct = () => {
  const { editProduct } = useVendorStore();

  const form = useForm<ProductType>({
    resolver: zodResolver(addProductSchema),
    defaultValues: {
      name: editProduct?.name || "",
      description: editProduct?.description || "",
      price: editProduct?.price,
      category: editProduct?.category,
      imageUrl: editProduct?.imageUrl,
    },
  });

  const onSubmit = (values: ProductType) => {
    console.log("Form submitted:", values);
    // 🔥 here you can call store actions or API
  };

  return (
    <div className="p-4">
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
                    <FormItem className="flex ">
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
                name="imageUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        placeholder="https://example.com/image.jpg"
                        {...field}
                      />
                    </FormControl>
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
    </div>
  );
};

export default AddOrEditProduct;
