import { AlertCircle, CheckCircle2, Clock, XCircle } from "lucide-react";

type Status = "pending" | "send for approval" | "rejected" | "verified";

const SuggestionText = ({ status }: { status: Status | undefined }) => {
  const GetIcon = () => {
    switch (status) {
      case "verified":
        return <CheckCircle2 className="w-4 h-4 text-green-600" />;
      case "rejected":
        return <XCircle className="w-4 h-4 text-red-600" />;
      case "pending":
        return <Clock className="w-4 h-4 text-amber-600" />;
      case "send for approval":
        return <Clock className="w-4 h-4 text-blue-600" />;
      default:
        return <AlertCircle className="w-4 h-4 text-amber-600" />;
    }
  };

  const getText = () => {
    if (status === "verified")
      return "Your All documents are verified, Your ready to start your buisness";

    if (status === "rejected")
      return "Upload rejected document again with correct format";

    if (status === "pending")
      return "You need to upload remaining original documents.";

    if (status === "send for approval")
      return "Documents are send for approval, you will recieve notification.";

    if (status === undefined)
      return "You need to upload your original documents for approval.";
  };

  return (
    <p className="text-[10px] font-medium text-amber-600 p-2 border border-amber-200 rounded-md flex items-center justify-start gap-2">
      {<GetIcon />} {getText()}
    </p>
  );
};

export default SuggestionText;
