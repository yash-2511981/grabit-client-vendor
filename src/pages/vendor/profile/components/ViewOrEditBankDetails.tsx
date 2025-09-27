import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Edit, Building2, MessageCircleWarning } from "lucide-react";
import { useEffect, useState } from "react";
import useVendorStore from "@/store/store";
import EditBankDetailsModal from "@/components/EditBankDetailsModal";
import useApi from "@/hooks/useApi";
import { GET_BANK_DETAILS } from "@/lib/routes";

const ViewOrEditBankDetails = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { bankDetails, setBankDetails } = useVendorStore();
  const { get } = useApi();

  useEffect(() => {
    const getBankDetails = async () => {
      const result = await get(GET_BANK_DETAILS);
      if (result?.success) {
        setBankDetails(result.data.bankDetails);
      }
    };

    getBankDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Card className="card-amber-gradient">
        <CardHeader>
          <CardTitle className="text-lg flex font-bold items-center gap-3">
            <div className="w-10 h-10 bg-amber-200 text-amber-600 flex items-center justify-center rounded-full">
              <Building2 size={20} />
            </div>
            Bank Details
          </CardTitle>
          <CardAction>
            {bankDetails && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-1"
              >
                <Edit size={16} />
                Edit
              </Button>
            )}
          </CardAction>
        </CardHeader>
        <CardContent className="flex flex-col">
          {bankDetails ? (
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {bankDetails.bankName}
                  </p>
                  <p className="text-xs text-gray-600">
                    {bankDetails.branchName}
                  </p>
                </div>
              </div>

              <div className="flex justify-between">
                <div>
                  <p className="text-xs text-gray-500">Account Holder</p>
                  <p className="text-sm text-gray-800">
                    {bankDetails.accountHolderName}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div>
                  <p className="text-xs text-gray-500">Account No.</p>
                  <p className="text-sm font-mono text-gray-800">
                    {bankDetails.accountNo}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">IFSC</p>
                  <p className="text-sm font-mono text-gray-800">
                    {bankDetails.ifscCode}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-yellow-100 text-yellow-600 flex items-center justify-center rounded-full mx-auto">
                <Building2 size={18} />
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-900">
                  Add Bank Details
                </h3>
                <p className="text-xs text-gray-600">
                  Required for withdrawals
                </p>
              </div>

              <div className="p-2 bg-yellow-50 border border-yellow-200 rounded-md">
                <div className="flex items-center gap-2">
                  <MessageCircleWarning
                    size={12}
                    className="text-yellow-600 flex-shrink-0"
                  />
                  <p className="text-xs text-yellow-700">
                    Complete your profile to unlock withdrawals
                  </p>
                </div>
              </div>

              <Button
                variant="primary"
                onClick={() => setIsModalOpen(true)}
                size="sm"
              >
                Add Details
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-md">
          <EditBankDetailsModal onClose={() => setIsModalOpen(false)} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ViewOrEditBankDetails;
