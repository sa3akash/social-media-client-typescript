/* eslint-disable @typescript-eslint/no-explicit-any */
import { socketService } from "./socket";
import { store } from "@/store";
import {
  addNotification,
  deleteNotification,
  updateAsReadNotification,
} from "@/store/reducers/NotificationReducer";

// notifications
export class NotificationSocket {
  static start(toast: any) {
    NotificationSocket.addNotificationSocket(toast);
  }

  static addNotificationSocket(toast: any) {
    socketService.socket.on("reaction-notification", (data, { userTo }) => {
      const { user } = store.getState().auth;
      if (user?.authId === userTo && data?.creator?.authId !== user?.authId) {
        store.dispatch(addNotification(data));
        toast({
          title: `${data?.creator?.name.first} ${data?.creator?.name.last} react your post: ${data.notificationType}`,
          description: `${data.message}`,
        });
      }
    });

    socketService.socket.on(
      "insert-notification",
      (notificationData, { userTo }) => {
        // store.dispatch(updateAsReadNotification(notificationId));
        const { user } = store.getState().auth;
        if (user?.authId === userTo) {
          store.dispatch(addNotification(notificationData));
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
