import useApi from "@/hooks/useApi";
import { GET_URL_FOR_PRIVATE_DOC, UPLOAD_AADHAR } from "@/lib/routes";
import useVendorStore from "@/store/store";
import {
  aadharCardModalSchema,
  type AadharCardModalType,
} from "@/types/formType";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { FileText, ReplaceIcon, UploadIcon, X } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";

const UploadAadharCard = () => {
  const form = useForm<AadharCardModalType>({
    resolver: zodResolver(aadharCardModalSchema),
    defaultValues: {
      aadharCard: undefined,
      aadharNumber: "",
    },
  });

  const fileRef = useRef<HTMLInputElement>(null);
  const { setVendorDocuments, documents } = useVendorStore();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { post } = useApi();

  const selectedFile = form.watch("aadharCard");

  //onsubmit handler
  const onSubmit = async (data: AadharCardModalType) => {
    setLoading(true);
    if (!data.aadharCard) return;

    const uploadUrlResult = await post(GET_URL_FOR_PRIVATE_DOC, {
      fileType: data.aadharCard.type,
      fileSize: data.aadharCard.size,
    });

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

    formData.append("file", data.aadharCard);

    const cloudinaryResult = await fetch(uploadUrl, {
      method: "POST",
      body: formData,
    });

    if (!cloudinaryResult.ok) {
      toast.error("Failed to upload file");
      setLoading(false);
      setOpen(false);
      return;
    }

    const result = await post(
      UPLOAD_AADHAR,
      {
        aadharCardNumber: data.aadharNumber,
        aadharCardPublicId: uploadParams.public_id,
      },
      "Aadhar Card uploaded"
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
    form.setValue("aadharCard", undefined);
    if (fileRef.current?.value) {
      fileRef.current.value = "";
    }
  };

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>
        <Button
          title={
            documents?.aadharCardNumber ? "Replace document" : "Upload document"
          }
          className="gap-2"
        >
          {documents?.aadharCardNumber ? (
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
          <DialogTitle className="text-xl">Upload Aadhar Card</DialogTitle>
          <DialogDescription className="sr-only">
            Upload your aadhar cards front and back both sides.
          </DialogDescription>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 flex gap-2">
            <p className="text-xs text-yellow-700 leading-relaxed text-start">
              Upload a front side on panCard as{" "}
              <span className="font-semibold">.pdf</span> file less than{" "}
              <span className="font-semibold">1MB</span> with correct details.
            </p>
          </div>
        </DialogHeader>

        <div className="mt-2">
          <Form {...form}>
            <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="aadharCard"
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

              <FormField
                control={form.control}
                name="aadharNumber"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <div className="flex items-center justify-between mb-2">
                      <FormLabel className="text-sm font-medium">
                        Aadhar Card No.
                      </FormLabel>
                      <FormMessage className="text-xs" />
                    </div>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

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

export default UploadAadharCard;
