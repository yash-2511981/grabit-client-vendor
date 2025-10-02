import { CalendarIcon, UploadIcon, X } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { useForm } from "react-hook-form";
import {
  foodLicensModalSchema,
  type FoodLicensModelType,
} from "@/types/formType";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { cn } from "@/lib/utils";
import { useRef, useState } from "react";
import { format } from "date-fns";
import useApi from "@/hooks/useApi";
import { GET_URL_FOR_PRIVATE_DOC, UPLOAD_FOOD_LICENSE } from "@/lib/routes";
import { toast } from "sonner";
import useVendorStore from "@/store/store";

const UploadFoodLicensModal = () => {
  const fileRef = useRef<HTMLInputElement>(null);
  const { setVendorDocuments } = useVendorStore();
  const [open, setOpen] = useState(false);
  const { post } = useApi();
  const form = useForm<FoodLicensModelType>({
    resolver: zodResolver(foodLicensModalSchema),
    defaultValues: {
      foodLicens: undefined,
      foodLicensIssueDate: "",
      foodLicensExpiryDate: "",
    },
  });

  const onSubmit = async (data: FoodLicensModelType) => {
    const uploadUrlResult = await post(GET_URL_FOR_PRIVATE_DOC, {
      fileType: data.foodLicens.type,
      fileSize: data.foodLicens.size,
    });

    console.log(uploadUrlResult);
    if (!uploadUrlResult?.success) return toast.error("Failed upload");

    const formData = new FormData();
    const { uploadParams, uploadUrl } = uploadUrlResult.data;

    formData.append("api_key", uploadParams.api_key);
    formData.append("timestamp", uploadParams.timestamp);
    formData.append("signature", uploadParams.signature);
    formData.append("public_id", uploadParams.public_id);
    formData.append("type", uploadParams.type);
    formData.append("resource_type", uploadParams.resource_type);

    // File MUST be last
    formData.append("file", data.foodLicens);

    const cloudinaryResult = await fetch(uploadUrl, {
      method: "POST",
      body: formData,
    });

    if (!cloudinaryResult.ok) toast.error("Failed to upload file");

    const result = await post(
      UPLOAD_FOOD_LICENSE,
      { ...data, foodLicensPublicId: uploadParams.public_id },
      "File Uploaded successfully"
    );
    console.log(result);
    if (result?.success) {
      setVendorDocuments(result.data.vendorDocs);
    }
    form.reset();
    if (fileRef.current?.value) {
      fileRef.current.value = "";
    }
    setOpen(false);
  };

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>
        <Button>
          <UploadIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Upload Food License</DialogTitle>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-2 mt-2">
            <p className="text-xs text-yellow-700">
              Upload a <b>.pdf</b> file less than 1MB with correct details.
            </p>
          </div>
        </DialogHeader>

        <div>
          <Form {...form}>
            <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="foodLicens"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel>Food License</FormLabel>
                      <FormMessage className="text-xs" />
                    </div>
                    <FormControl>
                      <div className="flex gap-2 border shadow rounded-md">
                        <Input
                          ref={fileRef}
                          type="file"
                          accept="application/pdf"
                          onChange={(e) => field.onChange(e.target.files?.[0])}
                          className="border-none shadow-none"
                        />
                        {form.getValues("foodLicens") && (
                          <Button
                            variant="outline"
                            onClick={() => {
                              field.onChange(null);
                              if (fileRef.current?.value) {
                                fileRef.current.value = "";
                              }
                            }}
                          >
                            <X />
                          </Button>
                        )}
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="foodLicensIssueDate"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel>Issue Date</FormLabel>
                      <FormMessage className="text-xs" />
                    </div>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value
                              ? format(field.value, "dd-MM-yyyy")
                              : "dd-mm-yyyy"}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={
                            field.value ? new Date(field.value) : undefined
                          }
                          onSelect={(date) => {
                            field.onChange(date ? date.toISOString() : "");
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="foodLicensExpiryDate"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel>Expiry Date</FormLabel>
                      <FormMessage className="text-xs" />
                    </div>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value
                              ? format(field.value, "dd-MM-yyyy")
                              : "dd-mm-yyyy"}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={
                            field.value ? new Date(field.value) : undefined
                          }
                          onSelect={(date) => {
                            field.onChange(date ? date.toISOString() : "");
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" variant="primary">
                Submit
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UploadFoodLicensModal;
