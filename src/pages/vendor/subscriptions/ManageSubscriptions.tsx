import ActionBar from "@/components/ActionBar";
import type { service, vendorservices } from "@/types/types";
import { Edit, PlusIcon, Subscript, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import AddOrEditSubscriptions from "./forms/addOrEditSubscription";
import useApi from "@/hooks/useApi";
import { DELETE_SUBSCRIPTIONS, GET_ALL_SUBSCRIPTIONS } from "@/lib/routes";
import useVendorStore from "@/store/store";
import Subscriptions from "@/components/Subscriptions";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import DialogBox from "@/components/DialogueBox";

const subscriptionServices: service[] = [
  {
    text: "All",
    icon: Subscript,
    serviceName: "allSubscriptions",
  },
  {
    text: "Active",
    icon: Subscript,
    serviceName: "activeSubscription",
  },
  {
    text: "Add",
    icon: PlusIcon,
    serviceName: "addSubscription",
  },
];

const ManageSubscriptions = () => {
  const { setSubscriptions, getEditSubscription, deleteSubscriptions } =
    useVendorStore();
  const { get, post } = useApi();

  const [openService, setOpenService] =
    useState<vendorservices>("allSubscriptions");
  const [selectedSubscriptions, setSelectedSubscriptions] = useState<string[]>(
    []
  );
  const [openDialogue, setOpenDialogue] = useState(false);

  const selectSubscription = (id: string) => {
    setSelectedSubscriptions([...selectedSubscriptions, id]);
  };

  const deselectSubscription = (id: string) => {
    setSelectedSubscriptions(selectedSubscriptions.filter((s) => s !== id));
  };

  //delete subscriptions
  const handleDeleteClick = async () => {
    if (selectedSubscriptions.length < 0) return;
    const result = await post(
      DELETE_SUBSCRIPTIONS,
      { subscriptions: selectedSubscriptions },
      `${selectedSubscriptions.length} Subscription${
        selectedSubscriptions.length > 1 && "s"
      } deleted`
    );
    if (result?.success) {
      deleteSubscriptions(selectedSubscriptions);
    }
  };

  useEffect(() => {
    const getSubscriptions = async () => {
      const result = await get(GET_ALL_SUBSCRIPTIONS);
      if (result?.success) {
        setSubscriptions(result.data.subscriptions);
      }
    };
    getSubscriptions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="h-screen space-y-6 p-4  flex flex-col app-background">
      <div className="flex flex-col gap-2 max-md:mt-14">
        <h1 className="text-3xl sm:text-4xl font-semibold">Subscriptions</h1>
        <p className="text-muted-foreground">
          Add, Review and Manage your subscriptions.
        </p>
      </div>
      <div className="sm:pt-4 flex">
        <ActionBar
          links={subscriptionServices}
          setOpenService={setOpenService}
          openService={openService}
        />
        <div className="flex gap-2 ml-4">
          <Button
            onClick={() => {
              setOpenService("editSubscription");
            }}
            disabled={
              selectedSubscriptions.length !== 1 ||
              openService === "addSubscription"
            }
            variant={openService === "editSubscription" ? "default" : "outline"}
            className={
              openService === "editSubscription"
                ? "bg-amber-500 hover:bg-amber-600 text-white"
                : "border-amber-300 text-amber-700 hover:bg-amber-50"
            }
          >
            <Edit className="w-4 h-4" />
          </Button>

          <Button
            disabled={
              selectedSubscriptions.length === 0 || openService === "addProduct"
            }
            variant="outline"
            className="border-red-300 text-red-700 hover:bg-red-50 disabled:opacity-50"
            onClick={() => setOpenDialogue(true)}
          >
            <Trash className="w-4 h-4" />
          </Button>
        </div>
      </div>
      <div className="flex flex-col flex-1 overflow-y-auto hide-scrollbar">
        {openService === "addSubscription" && (
          <AddOrEditSubscriptions
            setOpenService={setOpenService}
            editSubscription={undefined}
          />
        )}
        {openService === "editSubscription" && (
          <AddOrEditSubscriptions
            setOpenService={setOpenService}
            editSubscription={getEditSubscription(selectedSubscriptions[0])}
          />
        )}

        {openService === "allSubscriptions" && (
          <Subscriptions
            selectSubscription={selectSubscription}
            deselectSubscription={deselectSubscription}
            selectedSubscriptions={selectedSubscriptions}
          />
        )}
      </div>
      <Dialog open={openDialogue} onOpenChange={setOpenDialogue}>
        <DialogContent className="sm:max-w-md">
          <DialogBox
            setOpen={setOpenDialogue}
            onConfirm={handleDeleteClick}
            itemCount={selectedSubscriptions.length}
            itemType="Subscriptions"
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManageSubscriptions;
