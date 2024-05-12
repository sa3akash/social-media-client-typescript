import { getNotificaitons, getUserReaction } from "@/services/http";
import useFollowSocket from "@/services/socket/useFollowSocket";
import useNotificationSocket from "@/services/socket/useNotificationSocket";
import { AppDispatch } from "@/store";
import { setUserReactions } from "@/store/reducers/AuthReducer";
import { setNotification } from "@/store/reducers/NotificationReducer";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useEveryRender = () => {
  useFollowSocket();
  useNotificationSocket();

  const dispatch: AppDispatch = useDispatch();

  const notificationQuery = useQuery({
    queryKey: ["notificationNavbar"],
    queryFn: () => getNotificaitons(1),
  });
  const reactTionQuery = useQuery({
    queryKey: ["userReactions"],
    queryFn: getUserReaction,
  });

  useEffect(() => {
    const notificationData = notificationQuery.data?.data?.notifications;
    const reactionsData = reactTionQuery.data?.data?.reactions;
    if (notificationData) {
      dispatch(
        setNotification({
          notifications: notificationData,
        }),
      );
    }
    if (reactionsData) {
      dispatch(setUserReactions(reactionsData));
    }
  }, [dispatch, notificationQuery.data, reactTionQuery.data?.data?.reactions]);
};

export default useEveryRender;
