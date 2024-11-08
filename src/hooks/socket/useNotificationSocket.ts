import { useEffect } from "react";
import { useSocket } from "@/hooks/useSocket";
import { AppDispatch, RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import { setCallUser } from "@/store/reducers/NotificationReducer";
import { useToast } from "@/components/ui/use-toast";
import { notificationHelpers } from "@/store/rtk/notification/helpers";
// import NotificationToast from "@/components/common/NotificationToast";

const useNotificationSocket = () => {
  const { socket } = useSocket();

  const dispatch: AppDispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const { toast } = useToast();

  useEffect(() => {
    socket?.on("reaction-notification", (data, { userTo }) => {
      if (user?.authId === userTo && data?.creator?.authId !== user?.authId) {
        dispatch(notificationHelpers.addNotification(data));
        toast({
          description: `${data.message}`,
          data: data,
        });
      }
    });

    socket?.on("insert-notification", (notificationData, { userTo }) => {
      if (user?.authId === userTo) {
        dispatch(notificationHelpers.addNotification(notificationData));
        toast({
          description: `${notificationData.message}`,
          data: notificationData,
        });
      }
    });

    socket?.on("update-notification", (notificationId: string) => {
      dispatch(notificationHelpers.update(notificationId));
    });

    socket?.on("delete-notification", (notificationId: string) => {
      dispatch(notificationHelpers.delete(notificationId));
    });

    socket?.on("follow-notification", (notificationData, { userTo }) => {
      console.log(notificationData, { userTo });

      // if (user?.authId === userTo) {
      //   toast({
      //     description: `${notificationData.message}`,
      //     data: notificationData,
      //   });
      // }
    });

    return () => {
      socket?.off("reaction-notification");
      socket?.off("insert-notification");
      socket?.off("update-notification");
      socket?.off("delete-notification");
      socket?.off("follow-notification");
    };
  }, [dispatch, socket, toast, user?.authId]);

  useEffect(() => {
    /// call video
    socket?.on("call-user", (data) => {
      console.log(data);
      dispatch(
        setCallUser({
          userData: data.user,
          initiator: false,
          isCalling: true,
          isConnected: true,
          type: "video",
        }),
      );
    });
    return () => {
      socket?.off("call-user");
    };
  }, [dispatch, socket]);
};
export default useNotificationSocket;
