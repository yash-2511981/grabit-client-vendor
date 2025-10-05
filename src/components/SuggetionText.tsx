type Status = "pending" | "send for approval" | "rejected" | "verified";

const SuggestionText = ({ status }: { status: Status | undefined }) => {
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
      {getText()}
    </p>
  );
};

export default SuggestionText;
