import { Socket } from "socket.io-client";
import { ChatSocket } from "@/services/socket/chatSocket";
import { store } from "@/store";
import { setOnlineUsers } from "@/store/reducers/AuthReducer";

export class SocketService {
  socket: Socket;

  constructor(socket: Socket) {
    this.socket = socket;
  }
  // start connection
  public setupSocketConnection() {
    this.socketConnectionEvents();
    ChatSocket.init(this.socket);
  }

  // disconnect connection
  public disconnect() {
    this.socket.close();
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
