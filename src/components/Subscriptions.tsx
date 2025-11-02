import useVendorStore from "@/pages/vendor/store/store";
import SubscriptionCard from "./Subscription";

interface SubscriptionProps {
  selectSubscription: (id: string) => void;
  deselectSubscription: (id: string) => void;
  selectedSubscriptions: string[];
}

const Subscriptions = ({
  selectSubscription,
  deselectSubscription,
  selectedSubscriptions,
}: SubscriptionProps) => {
  const { subscriptions } = useVendorStore();

  const handleToggle = (id: string) => {
    if (selectedSubscriptions.includes(id)) {
      deselectSubscription(id);
    } else {
      selectSubscription(id);
    }
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      {subscriptions.map((subscription) => (
        <SubscriptionCard
          key={subscription._id}
          subscription={subscription}
          isSelected={selectedSubscriptions.includes(subscription._id)}
          onToggle={() => handleToggle(subscription._id)}
        />
      ))}
    </div>
  );
};

export default Subscriptions;
