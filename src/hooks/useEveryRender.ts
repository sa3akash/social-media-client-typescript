import { AppDispatch } from "@/store";
import { setLoginUserData } from "@/store/reducers/AuthReducer";

import { useLogedUserDataQuery } from "@/store/rtk/auth/authSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import useNotificationSocket from "./socket/useNotificationSocket";
import useFollowSocket from "./socket/useFollowSocket";

const useEveryRender = () => {
  const dispatch: AppDispatch = useDispatch();

  const { data } = useLogedUserDataQuery(1);

  useNotificationSocket()
  useFollowSocket()
  
  useEffect(() => {
    if (data) {
      dispatch(setLoginUserData(data));
    }
  }, [data, dispatch]);
};

export default useEveryRender;
