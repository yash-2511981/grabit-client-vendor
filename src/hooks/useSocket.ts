import SocketContext from "@/context/useSocketContext";
import { useContext } from "react";

export const useSocket = () => useContext(SocketContext);
