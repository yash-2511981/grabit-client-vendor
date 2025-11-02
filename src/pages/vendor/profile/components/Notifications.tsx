import NotificationBlock from "@/components/Notification";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useVendorStore from "@/pages/vendor/store/store";
import { BellIcon } from "lucide-react";
import { useCallback } from "react";

const Notifications = () => {
  const { notifications } = useVendorStore();

  const getUnreadNotificationCount = useCallback(() => {
    const unreadNotification = notifications.filter((n) => n.seen);
    return unreadNotification.length;
  }, [notifications]);

  return (
    <Card className="card-amber-gradient space-y-0">
      <CardHeader className="">
        <CardTitle className="text-lg flex font-bold items-center gap-3">
          <div className="w-10 h-10 bg-amber-200 text-amber-600 flex items-center justify-center rounded-full">
            <BellIcon />
          </div>{" "}
          Notifications
          <span className="text-amber-600 rounded-lg text-xs p-1 px-2 bg-amber-200">
            {getUnreadNotificationCount()} unread
          </span>
        </CardTitle>
        <CardAction>
          <Button variant="outline" className="flex gap-1" size="sm">
            View All
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent className="flex flex-col space-y-2">
        {notifications.map((notification, i) => {
          if (i <= 1)
            return <NotificationBlock notification={notification} key={i} />;
        })}
      </CardContent>
    </Card>
  );
};

export default Notifications;
