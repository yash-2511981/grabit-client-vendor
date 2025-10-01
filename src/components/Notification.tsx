import { getFormatedDate } from "@/lib/utils";
import type { Notification } from "@/types/vendor";

const NotificationBlock = ({
  notification,
}: {
  notification: Notification;
}) => {
  return (
    <div
      key={notification._id}
      className="p-2 rounded-md border border-amber-100 hover:shadow-sm hover:bg-amber-100/40 transition-all duration-300 flex justify-between"
    >
      {notification.type === "code" ? (
        <p className="text-xs w-[65%] line-clamp-2 leading-relaxed">
          Your one time crash code for{" "}
          <span className="font-semibold">{notification.orderId}</span> is{" "}
          <span className="font-semibold text-amber-600">
            {notification.code}
          </span>{" "}
          valid till 2 min .
        </p>
      ) : (
        <p className="text-xs w-[70%] line-clamp-2 leading-relaxed">
          {notification.text}.
        </p>
      )}
      <div className="flex flex-col text-end flex-shrink-0">
        <span className="text-sm">{notification.seen ? "" : "unread"}</span>
        <span className="text-xs">
          {getFormatedDate(notification.createdAt)}
        </span>
      </div>
    </div>
  );
};

export default NotificationBlock;
