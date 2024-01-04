import { INotification } from "@/interfaces/notificaton.interface";
import { socketService } from "./socket";
import { store } from "@/store";
import {
  addNotification,
  deleteNotification,
  updateAsReadNotification,
} from "@/store/reducers/NotificationReducer";

// notifications
export class NotificationSocket {
  static start() {}
  static addNotificationSocket() {
    socketService.socket.on(
      "reaction-notification",
      (data: INotification, { userTo }) => {
        const { user } = store.getState().auth;
        if (user?._id === userTo) {
          store.dispatch(addNotification(data));
        }
      },
    );
    socketService.socket.on("update-notification", (notificationId: string) => {
      store.dispatch(updateAsReadNotification(notificationId));
    });
    socketService.socket.on("delete-notification", (notificationId: string) => {
      store.dispatch(deleteNotification(notificationId));
    });
  }
}
