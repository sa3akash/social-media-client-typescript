import { useEffect } from "react";
import { useSocket } from "@/hooks/useSocket";
import { AppDispatch, RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import {
  addNotification,
  deleteNotification,
  updateAsReadNotification,
} from "@/store/reducers/NotificationReducer";
import { useToast } from "@/components/ui/use-toast";
// import NotificationToast from "@/components/common/NotificationToast";

const useNotificationSocket = () => {
  const { socket } = useSocket();

  const dispatch: AppDispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const { toast } = useToast();

  useEffect(() => {
    socket?.on("reaction-notification", (data, { userTo }) => {
      if (user?.authId === userTo && data?.creator?.authId !== user?.authId) {
        dispatch(addNotification(data));
        toast({
          title: `${data?.creator?.name.first} ${data?.creator?.name.last} react your post: ${data.notificationType}`,
          description: `${data.message}`,
        });
      }
    });

    socket?.on("insert-notification", (notificationData, { userTo }) => {
      if (user?.authId === userTo) {
        dispatch(addNotification(notificationData));
      }
    });

    socket?.on("update-notification", (notificationId: string) => {
      dispatch(updateAsReadNotification(notificationId));
    });

    socket?.on("delete-notification", (notificationId: string) => {
      dispatch(deleteNotification(notificationId));
    });

    return () => {
      socket?.off("reaction-notification");
      socket?.off("insert-notification");
      socket?.off("update-notification");
      socket?.off("delete-notification");
    };
  }, [dispatch, socket, toast, user?.authId]);
};
export default useNotificationSocket;
