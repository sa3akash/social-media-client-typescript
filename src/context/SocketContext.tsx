import { SocketService } from "@/services/socket/socket";
import { RootState } from "@/store";
import { createContext, ReactNode, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { io, Socket } from "socket.io-client";

export interface SocketContextType {
  socket: Socket | null;
}

export const SocketContext = createContext<SocketContextType>({ socket: null });

export const SocketContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const mainSocket = io("http://localhost:5500", {
      path: "/socket.io",
      transports: ["websocket"],
      secure: true,
      query: {
        authId: user?.authId,
      },
    });
    setSocket(mainSocket);

    const socketService = new SocketService(mainSocket);
    socketService.setupSocketConnection();
    return () => {
      mainSocket.disconnect();
      socketService.disconnect();
      setSocket(null);
    };
  }, [user?.authId]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
