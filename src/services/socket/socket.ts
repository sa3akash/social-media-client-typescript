import { config } from "@/config";
import { INotification } from "@/interfaces/notificaton.interface";
import { store } from "@/store";
import {
  addNotification,
  deleteNotification,
  updateAsReadNotification,
} from "@/store/reducers/NotificationReducer";
import { setTost } from "@/store/reducers/TostReducer";
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
    this.socket.on("reaction-notification", (data: INotification) => {
      store.dispatch(addNotification(data));
      // console.log(data)
    });

    this.socket.on("update-notification", (notificationId: string) => {
      store.dispatch(updateAsReadNotification(notificationId));
      // console.log(notificationId)
    });
    this.socket.on("delete-notification", (notificationId: string) => {
      store.dispatch(deleteNotification(notificationId));
      // console.log(notificationId)
      store.dispatch(
        setTost({
          type: "success",
          message: 'Notification deleted successfully.',
        }),
      );
    });
  }
}

export const socketService: SocketService = new SocketService();
