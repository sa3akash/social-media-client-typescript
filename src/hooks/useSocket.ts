import { SocketContext, SocketContextType } from "@/context/SocketContext";
import { useContext } from "react";

export const useSocket = () => {
  return useContext(SocketContext) as SocketContextType;
};
