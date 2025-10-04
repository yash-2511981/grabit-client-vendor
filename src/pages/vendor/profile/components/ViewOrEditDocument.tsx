import SuggestionText from "@/components/SuggetionText";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import UploadFoodLicensModal from "@/components/UploadFoodLicensModal";
import useApi from "@/hooks/useApi";
import { GET_VENDOR_DOC, GET_VIEW_URL } from "@/lib/routes";
import useVendorStore from "@/store/store";
import { format } from "date-fns";
import { Eye, FolderClosed, ReplaceIcon, UploadIcon } from "lucide-react";
import { useEffect } from "react";

const ViewOrEditDocument = () => {
  const { setVendorDocuments, documents, vendor } = useVendorStore();
  const { get } = useApi();

  useEffect(() => {
    if (!vendor) return;

    const getDocs = async () => {
      const result = await get(GET_VENDOR_DOC);

      if (result?.success) {
        setVendorDocuments(result.data.vendorDocs);
      }
    };

    getDocs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const viewFoodLicense = async () => {
    const result = await get(`${GET_VIEW_URL}/foodlicense`);
    if (result?.success) {
      window.open(result.data.url);
    }
  };

  return (
    <>
      <Card className="h-full card-amber-gradient">
        <CardHeader className="">
          <CardTitle className="text-lg flex font-bold items-center gap-3">
            <div className="w-10 h-10 bg-amber-200 text-amber-600 flex items-center justify-center rounded-full">
              <FolderClosed />
            </div>{" "}
            Your Documents
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col space-y-4">
          <div className="border border-amber-100 p-2 rounded-md hover:bg-amber-100/60">
            <div className="flex gap-3 items-center justify-between">
              <div>
                <p className="text-lg font-semibold">Food Licens</p>
                <span className="text-muted-foreground text-sm">
                  {documents?.foodLicensExpiryDate
                    ? `Valid till ${format(
                        documents.foodLicensExpiryDate,
                        "do MMMM yyyy"
                      )}`
                    : "upload food licens file in .pdf format"}
                </span>
              </div>
              <div className="flex gap-3">
                {documents?.foodLicensIssueDate ? (
                  <>
                    <Button onClick={viewFoodLicense}>
                      <Eye />
                    </Button>
                    <UploadFoodLicensModal />
                  </>
                ) : (
                  <UploadFoodLicensModal />
                )}
              </div>
            </div>
          </div>
          <div className="border border-amber-100 p-2 rounded-md hover:bg-amber-100/60">
            <div className="flex gap-3 items-center justify-between">
              <div>
                <p className="text-lg font-semibold">Aadhar Card</p>
                <span className="text-muted-foreground text-sm">
                  {documents?.addharCardNumber
                    ? "Adhar No. XXXX-XXXX-8787"
                    : "upload aadharcard front and back in single .pdf"}
                </span>
              </div>
              <div className="flex gap-3">
                {documents?.addharCardNumber ? (
                  <>
                    <Button>
                      <Eye />
                    </Button>
                    <Button>
                      <ReplaceIcon />
                    </Button>
                  </>
                ) : (
                  <Button>
                    <UploadIcon />
                  </Button>
                )}
              </div>
            </div>
          </div>
          <div className="border border-amber-100 p-2 rounded-md shadow hover:bg-amber-100/60 transition-colors duration-300">
            <div className="flex gap-3 items-center justify-between">
              <div>
                <p className="text-lg font-semibold">Pan Card</p>
                <span className="text-muted-foreground text-sm">
                  {documents?.panCardNumber
                    ? "Pan No. PZXXXXXX8P"
                    : "upload front side of the pan card"}
                </span>
              </div>
              <div className="flex gap-3">
                {documents?.panCardNumber ? (
                  <>
                    <Button>
                      <Eye />
                    </Button>
                    <Button>
                      <ReplaceIcon />
                    </Button>
                  </>
                ) : (
                  <Button>
                    <UploadIcon />
                  </Button>
                )}
              </div>
            </div>
          </div>
          <SuggestionText status={documents?.verificationStatus} />
        </CardContent>
      </Card>
    </>
  );
};

export default ViewOrEditDocument;
