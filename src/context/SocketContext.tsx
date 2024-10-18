import { config } from "@/config";
import { RootState, store } from "@/store";
import { setOnlineUsers } from "@/store/reducers/AuthReducer";
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
    const mainSocket = io(config.baseUrl, {
      path: "/socket.io",
      transports: ["websocket"],
      secure: true,
      query: {
        authId: user?.authId,
      },
    });
    setSocket(mainSocket);

    mainSocket.on("connect", () => {
      console.log(mainSocket.id);
    });

    mainSocket.on("user-online", (users) => {
      store.dispatch(setOnlineUsers(users));
    });

 

    mainSocket.on("disconnect", (reason: Socket.DisconnectReason) => {
      console.log(`Reason: ${reason}`);
      mainSocket.connect();
    });
    mainSocket.on("connect_error", (error: Error) => {
      console.log(`Error: ${error!.message}`);
      mainSocket.connect();
    });

    return () => {
      mainSocket.disconnect();
      setSocket(null);
    };
  }, [user?.authId]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
