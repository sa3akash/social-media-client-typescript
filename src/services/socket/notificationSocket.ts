import { socketService } from "./socket";
import { store } from "@/store";
import {
  addNotification,
  deleteNotification,
  updateAsReadNotification,
} from "@/store/reducers/NotificationReducer";

// notifications
export class NotificationSocket {
  static start() {
    NotificationSocket.addNotificationSocket();
  }

  static addNotificationSocket() {
    socketService.socket.on("reaction-notification", (data, { userTo }) => {
      const { user } = store.getState().auth;
      if (user?._id === userTo && data?.creator?.authId !== user?._id) {
        store.dispatch(addNotification(data));
      }
    });

    socketService.socket.on(
      "insert-notification",
      (notificationData, { userTo }) => {
        // store.dispatch(updateAsReadNotification(notificationId));
        const { user } = store.getState().auth;
        if (user?._id === userTo) {
          store.dispatch(addNotification(notificationData));
        }
      }
    );

    socketService.socket.on("update-notification", (notificationId: string) => {
      store.dispatch(updateAsReadNotification(notificationId));
    });

    socketService.socket.on("delete-notification", (notificationId: string) => {
      store.dispatch(deleteNotification(notificationId));
    });
  }
}
