import {
  CalendarIcon,
  ReplaceIcon,
  UploadIcon,
  X,
  FileText,
  AlertCircle,
} from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
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
  const form = useForm<FoodLicensModelType>({
    resolver: zodResolver(foodLicensModalSchema),
    defaultValues: {
      foodLicens: undefined,
      foodLicensIssueDate: "",
      foodLicensExpiryDate: "",
    },
  });

  const fileRef = useRef<HTMLInputElement>(null);
  const { setVendorDocuments, documents } = useVendorStore();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { post } = useApi();

  const selectedFile = form.watch("foodLicens");

  //onsubmit handler
  const onSubmit = async (data: FoodLicensModelType) => {
    setLoading(true);
    if (!data.foodLicens) return;

    const uploadUrlResult = await post(GET_URL_FOR_PRIVATE_DOC, {
      fileType: data.foodLicens.type,
      fileSize: data.foodLicens.size,
    });

    console.log(uploadUrlResult);
    if (!uploadUrlResult?.success) {
      setLoading(false);
      return toast.error("Failed upload");
    }

    const formData = new FormData();
    const { uploadParams, uploadUrl } = uploadUrlResult.data;

    formData.append("api_key", uploadParams.api_key);
    formData.append("timestamp", uploadParams.timestamp);
    formData.append("signature", uploadParams.signature);
    formData.append("public_id", uploadParams.public_id);
    formData.append("type", uploadParams.type);
    formData.append("resource_type", uploadParams.resource_type);

    formData.append("file", data.foodLicens);

    const cloudinaryResult = await fetch(uploadUrl, {
      method: "POST",
      body: formData,
    });
    console.log(cloudinaryResult);
    if (!cloudinaryResult.ok) {
      toast.error("Failed to upload file");
      setLoading(false);
      setOpen(false);
      return;
    }

    const result = await post(
      UPLOAD_FOOD_LICENSE,
      {
        foodLicensIssueDate: data.foodLicensIssueDate,
        foodLicensExpiryDate: data.foodLicensExpiryDate,
        foodLicensPublicId: uploadParams.public_id,
      },
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
    setLoading(false);
    setOpen(false);
  };

  const handleRemoveFile = () => {
    form.setValue("foodLicens", undefined);
    if (fileRef.current?.value) {
      fileRef.current.value = "";
    }
  };

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>
        <Button
          title={documents?.foodLicensIssueDate ? "Replace document" : "Upload document"}
          className="gap-2"
        >
          {documents?.foodLicensIssueDate ? (
            <>
              <ReplaceIcon className="h-4 w-4" />
              <span className="hidden sm:inline">Replace</span>
            </>
          ) : (
            <>
              <UploadIcon className="h-4 w-4" />
              <span className="hidden sm:inline">Upload</span>
            </>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader className="space-y-3">
          <DialogTitle className="text-xl">Upload Food License</DialogTitle>
          <DialogDescription className="sr-only">
            Upload your food license document with issue and expiry dates
          </DialogDescription>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 flex gap-2">
            <AlertCircle className="h-4 w-4 text-yellow-700 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-yellow-700 leading-relaxed">
              Upload a <span className="font-semibold">.pdf</span> file less
              than <span className="font-semibold">1MB</span> with correct
              details.
            </p>
          </div>
        </DialogHeader>

        <div className="mt-2">
          <Form {...form}>
            <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="foodLicens"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between mb-2">
                      <FormLabel className="text-sm font-medium">
                        Food License Document
                      </FormLabel>
                      <FormMessage className="text-xs" />
                    </div>
                    <FormControl>
                      <div className="space-y-2">
                        <div className="relative">
                          <Input
                            ref={fileRef}
                            type="file"
                            accept="application/pdf"
                            onChange={(e) =>
                              field.onChange(e.target.files?.[0])
                            }
                            className="cursor-pointer file:bg-gray-100 file:flex file:items-center file:justify-center file:px-2 file:rounded-md file:border-0 file:text-sm file:font-medium"
                            disabled={loading}
                          />
                        </div>
                        {selectedFile && (
                          <div className="flex items-center justify-between p-3 bg-muted rounded-md border">
                            <div className="flex items-center gap-2 flex-1 min-w-0">
                              <FileText className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                              <span className="text-sm truncate">
                                {selectedFile.name}
                              </span>
                            </div>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={handleRemoveFile}
                              className="ml-2 h-8 w-8 p-0 hover:bg-destructive/10"
                              disabled={loading}
                            >
                              <X className="h-4 w-4" />
                              <span className="sr-only">Remove file</span>
                            </Button>
                          </div>
                        )}
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="foodLicensIssueDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <div className="flex items-center justify-between mb-2">
                        <FormLabel className="text-sm font-medium">
                          Issue Date
                        </FormLabel>
                        <FormMessage className="text-xs" />
                      </div>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              disabled={loading}
                              className={cn(
                                "w-full justify-start text-left font-normal h-10",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4 flex-shrink-0" />
                              <span className="truncate">
                                {field.value
                                  ? format(field.value, "dd-MM-yyyy")
                                  : "Select date"}
                              </span>
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
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
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
                    <FormItem className="flex flex-col">
                      <div className="flex items-center justify-between mb-2">
                        <FormLabel className="text-sm font-medium">
                          Expiry Date
                        </FormLabel>
                        <FormMessage className="text-xs" />
                      </div>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              disabled={loading}
                              className={cn(
                                "w-full justify-start text-left font-normal h-10",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4 flex-shrink-0" />
                              <span className="truncate">
                                {field.value
                                  ? format(field.value, "dd-MM-yyyy")
                                  : "Select date"}
                              </span>
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
                            disabled={(date) => date < new Date()}
                          />
                        </PopoverContent>
                      </Popover>
                    </FormItem>
                  )}
                />
              </div>

              <Button
                type="submit"
                className="w-full h-11 gap-2"
                variant="primary"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span>Uploading...</span>
                  </>
                ) : (
                  <span>Submit</span>
                )}
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UploadFoodLicensModal;
