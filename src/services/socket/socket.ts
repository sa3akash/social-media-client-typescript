/* eslint-disable @typescript-eslint/no-explicit-any */
import { Socket, io } from "socket.io-client";
import { PostSocket } from "@/services/socket/postSocket";
import { NotificationSocket } from "@/services/socket/notificationSocket";
import { FollowSocket } from "@/services/socket/followSocket";
import { ChatSocket } from "@/services/socket/chatSocket";

class SocketService {
  socket: Socket;

  constructor() {
    this.socket = io("http://localhost:5500", {
      path: "/socket.io",
      transports: ["websocket"],
      secure: true,
    });
  }
  // start connection
  public setupSocketConnection(toast: any) {
    this.socketConnectionEvents();
    PostSocket.start();
    NotificationSocket.start(toast);
    FollowSocket.start();
    ChatSocket.init()
  }

  // disconnect connection
  public disconnect() {
    this.socket.disconnect();
    console.log("socket disconnected");
  }

  // listen for events
  private socketConnectionEvents() {
    this.socket.on("connect", () => {
      console.log("connected = ", this.socket.id);
    });
    this.socket.on("disconnect", (reason: Socket.DisconnectReason) => {
      console.log(`Reason: ${reason}`);
      this.socket.connect();
    });
    this.socket.on("connect_error", (error: Error) => {
      console.log(`Error: ${error!.message}`);
      this.socket.connect();
    });
  }
}

export const socketService: SocketService = new SocketService();
