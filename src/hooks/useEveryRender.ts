import {
  getLoginData,
  getNotificaitons,
} from "@/services/http";
import { AppDispatch } from "@/store";
import {
  setLoginUserData,
} from "@/store/reducers/AuthReducer";
import { setNotification } from "@/store/reducers/NotificationReducer";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useEveryRender = () => {



  const dispatch: AppDispatch = useDispatch();

  const notificationQuery = useQuery({
    queryKey: ["notificationNavbar"],
    queryFn: () => getNotificaitons(1),
  });
  const LogedUserQuery = useQuery({
    queryKey: ["logedUserData"],
    queryFn: () => getLoginData(),
  });

  

  useEffect(() => {
    const notificationData = notificationQuery.data?.data?.notifications;
    if (notificationData) {
      dispatch(
        setNotification({
          notifications: notificationData,
          callUser: null,
        }),
      );
    }
  }, [dispatch, notificationQuery.data]);

  useEffect(() => {
    if (LogedUserQuery.data) {
      dispatch(setLoginUserData(LogedUserQuery.data.data));
    }
  }, [LogedUserQuery.data, dispatch]);
};

export default useEveryRender;
