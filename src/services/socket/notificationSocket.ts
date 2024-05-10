/* eslint-disable @typescript-eslint/no-explicit-any */
import { store } from "@/store";
import {
  addNotification,
  deleteNotification,
  updateAsReadNotification,
} from "@/store/reducers/NotificationReducer";
import { Socket } from "socket.io-client";

// notifications
export class NotificationSocket {
  static start(socket: Socket, toast: any) {
    NotificationSocket.addNotificationSocket(socket, toast);
  }

  static addNotificationSocket(socket: Socket, toast: any) {
    socket.on("reaction-notification", (data, { userTo }) => {
      const { user } = store.getState().auth;
      if (user?.authId === userTo && data?.creator?.authId !== user?.authId) {
        store.dispatch(addNotification(data));
        toast({
          title: `${data?.creator?.name.first} ${data?.creator?.name.last} react your post: ${data.notificationType}`,
          description: `${data.message}`,
        });
      }
    });

    socket.on("insert-notification", (notificationData, { userTo }) => {
      // store.dispatch(updateAsReadNotification(notificationId));
      const { user } = store.getState().auth;
      if (user?.authId === userTo) {
        store.dispatch(addNotification(notificationData));
      }
    });

    socket.on("update-notification", (notificationId: string) => {
      store.dispatch(updateAsReadNotification(notificationId));
    });

    socket.on("delete-notification", (notificationId: string) => {
      store.dispatch(deleteNotification(notificationId));
    });
  }
}
