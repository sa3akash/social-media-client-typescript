 
import { Socket, io } from "socket.io-client";
import { PostSocket } from "@/services/socket/postSocket";
import { FollowSocket } from "@/services/socket/followSocket";
import { ChatSocket } from "@/services/socket/chatSocket";
import { store } from "@/store";
import { setOnlineUsers } from "@/store/reducers/AuthReducer";

class SocketService {
  socket: Socket;

  constructor() {
    this.socket = io("http://localhost:5500", {
      path: "/socket.io",
      transports: ["websocket"],
      secure: true,
      query: {
        authId: store.getState().auth.user?.authId,
      },
    });
  }
  // start connection
  public setupSocketConnection() {
    this.socketConnectionEvents();
    PostSocket.start();
    FollowSocket.start();
    ChatSocket.init();
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

    this.socket.on("user-online", (users) => {
      store.dispatch(setOnlineUsers(users));
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
