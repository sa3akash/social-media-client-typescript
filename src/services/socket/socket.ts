import { config } from "@/config";
import { INotification } from "@/interfaces/notificaton.interface";
import { store } from "@/store";
import {
  addNotification,
  deleteNotification,
  updateAsReadNotification,
} from "@/store/reducers/NotificationReducer";
import { Socket, io } from "socket.io-client";

class SocketService {
  socket: Socket;

  constructor() {
    this.socket = io(config.baseUrl, {
      transports: ["websocket"],
      secure: true,
    });
  }
  // start connection
  public setupSocketConnection() {
    this.socketConnectionEvents();
    this.notificationSocket();
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

  // reactions
  private notificationSocket() {
    this.socket.on(
      "reaction-notification",
      (data: INotification, { userTo }) => {
        const { user } = store.getState().auth;
        if (user?._id === userTo) {
          store.dispatch(addNotification(data));
        }
      }
    );
    this.socket.on("update-notification", (notificationId: string) => {
      store.dispatch(updateAsReadNotification(notificationId));
    });
    this.socket.on("delete-notification", (notificationId: string) => {
      store.dispatch(deleteNotification(notificationId));
    });
  }
}

export const socketService: SocketService = new SocketService();
