import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
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
  bankDetailsFormSchema,
  type BankDetailsFormSchema,
} from "@/types/formType";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Building2, Save, X } from "lucide-react";
import useApi from "@/hooks/useApi";
import { ADD_BANK_DETAILS, GET_ORIGINAL_BANK_DETAILS } from "@/lib/routes";
import useVendorStore from "@/pages/vendor/store/store";
import apiCLient from "@/lib/axios-client";

const EditBankDetailsModal = ({ onClose }: { onClose: () => void }) => {
  const [isLoading, setIsLoading] = useState(false);

  const { bankDetails, setBankDetails } = useVendorStore();
  const { get, post } = useApi();

  const form = useForm<BankDetailsFormSchema>({
    resolver: zodResolver(bankDetailsFormSchema),
    defaultValues: {
      bankName: "",
      accountHolderName: "",
      accountNo: "",
      ifscCode: "",
    },
  });

  useEffect(() => {
    if (bankDetails === undefined) return;

    const getPrevBankDetails = async () => {
      try {
        const result = await get(GET_ORIGINAL_BANK_DETAILS);
        if (result?.success && result.data.bankDetails) {
          const details = result.data.bankDetails;
          form.reset({
            _id: details._id,
            bankName: details.bankName || "",
            branchName: details.branchName || "",
            accountHolderName: details.accountHolderName || "",
            accountNo: details.accountNo.toString() || "",
            ifscCode: details.ifscCode || "",
          });
        }
      } catch (error) {
        console.error("Error fetching previous bank details:", error);
        toast.error("Could not load previous bank details.");
      }
    };

    getPrevBankDetails();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const { unsubscribe } = form.watch(async (data, { type, name }) => {
      if (
        type === "change" &&
        name === "ifscCode" &&
        data.ifscCode?.length === 11
      ) {
        const isValid = await form.trigger("ifscCode");
        if (!isValid) return;
        const response = await apiCLient.get(
          `https://ifsc.razorpay.com/${data.ifscCode}`
        );

        if (response.status === 200 && response.data) {
          form.setValue("bankName", response.data.BANK);
          form.setValue("branchName", response.data.BRANCH);
        }
      }
    });

    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.watch("ifscCode")]);

  const updateBankDetails = async (data: BankDetailsFormSchema) => {
    setIsLoading(true);
    console.log(data);
    try {
      const result = await post(ADD_BANK_DETAILS, data, "Added SuccessFully ");
      if (result?.success) {
        setBankDetails(result.data.bankDetails);
      }
      onClose();
    } catch (error) {
      console.log(error);
      toast.error("Failed to update bank details. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      <DialogHeader className="mb-4">
        <DialogTitle className="flex items-center gap-2">
          <Building2 size={20} className="text-amber-600" />
          Update Bank Details
        </DialogTitle>
      </DialogHeader>

      <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
        <div className="flex items-start gap-2">
          <p className="text-xs text-yellow-700">
            Ensure all bank details are accurate. Incorrect information may
            delay payments.
          </p>
        </div>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(updateBankDetails)}
          className="space-y-4"
        >
          <div>
            <FormField
              control={form.control}
              name="bankName"
              render={({ field }) => (
                <FormItem>
                  <div className="flex justify-between items-center">
                    <FormLabel className="text-sm font-medium">
                      Bank Name
                    </FormLabel>
                    <FormMessage className="text-xs" />
                  </div>
                  <FormControl>
                    <Input {...field} disabled={true} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="ifscCode"
            render={({ field }) => (
              <FormItem>
                <div className="flex justify-between items-center">
                  <FormLabel className="text-sm font-medium">
                    IFSC Code
                  </FormLabel>
                  <FormMessage className="text-xs" />
                </div>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="e.g., SBIN0001234"
                    disabled={isLoading}
                    style={{ textTransform: "uppercase" }}
                    onChange={(e) => {
                      field.onChange(e.target.value.toUpperCase());
                    }}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="accountHolderName"
            render={({ field }) => (
              <FormItem>
                <div className="flex justify-between items-center">
                  <FormLabel className="text-sm font-medium">
                    Account Holder Name
                  </FormLabel>
                  <FormMessage className="text-xs" />
                </div>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="As per bank records"
                    disabled={isLoading}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="accountNo"
            render={({ field }) => (
              <FormItem>
                <div className="flex justify-between items-center">
                  <FormLabel className="text-sm font-medium">
                    Account Number
                  </FormLabel>
                  <FormMessage className="text-xs" />
                </div>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Enter complete account number"
                    disabled={isLoading}
                    type="text"
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isLoading}
              className="flex-1"
            >
              <X size={16} className="mr-1" />
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="flex-1"
              variant="primary"
            >
              <Save size={16} className="mr-1" />
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default EditBankDetailsModal;
