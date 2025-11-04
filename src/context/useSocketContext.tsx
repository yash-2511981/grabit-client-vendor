import { useToast } from "@/hooks/useToast";
import useVendorStore from "@/pages/vendor/store/store";
import type { PendingOrder } from "@/types/vendor";
import { createContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

const SocketContext = createContext<Socket | null>(null);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const { open, vendor, addPendingOrder } = useVendorStore();
  const toast = useToast();

  //function for connecting to backend socket server.
  const connectToSocketServer = () => {
    if (vendor?._id === undefined) return;

    const socketConn = io(import.meta.env.VITE_SERVER_URL, {
      withCredentials: true,
      query: {
        userId: vendor?._id,
        role: "vendor",
      },
    });

    return socketConn;
  };

  useEffect(() => {
    if (!open) return;

    const newSocket = connectToSocketServer();

    if (!newSocket) return;

    setSocket(newSocket);

    const disconnectSocket = () => {
      newSocket.disconnect();
    };

    //socket event to handle a new order event
    const handleNewOrder = ({ order }: { order: PendingOrder }) => {
      addPendingOrder(order);
      toast.order(
        "New Order Received",
        "A new order has been placed."
      );
    };

    newSocket?.on("new_order", handleNewOrder);

    //reconnecting the disconnected user again with socket.
    const handleOnline = () => {
      if (open && vendor?._id) {
        const reconnectedSocket = connectToSocketServer();
        if (reconnectedSocket) {
          setSocket(reconnectedSocket);
        }
      }
    };

    //clean up function to disconnect the socket connection when its unnecessary.
    window.addEventListener("beforeunload", disconnectSocket);
    window.addEventListener("offline", disconnectSocket);

    window.addEventListener("online", handleOnline);

    return () => {
      newSocket.disconnect();
      window.removeEventListener("beforeunload", disconnectSocket);
      window.removeEventListener("offline", disconnectSocket);
      newSocket.off("new_order", handleNewOrder);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export default SocketContext;
