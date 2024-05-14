import { useEffect } from "react";
import { useSocket } from "@/hooks/useSocket";
import { useQueryClient } from "@tanstack/react-query";
import { AppDispatch, RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import { addFollowing, removeFollowing } from "@/store/reducers/AuthReducer";
import { SocketUtils } from "./socketUtils";
import { IFullUserDoc } from "@/interfaces/auth.interface";

const useFollowSocket = () => {
  const { socket } = useSocket();
  const queryClient = useQueryClient();

  const dispatch: AppDispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const socketUtils = new SocketUtils(queryClient);

    socket?.on("add-follow", ({ id, to }) => {
      if (user?.authId === to) {
        dispatch(addFollowing({ id }));
        const userDetails = queryClient.getQueryData([
          "profile",
          to,
        ]) as IFullUserDoc;

        if (userDetails) {
          socketUtils.updateUserDetails({
            key: ["profile", to],
            mainData: userDetails,
            updateFeild: { followingCount: +userDetails.followingCount + 1 },
          });
        }
      }
    });
    socket?.on("remove-follow", ({ id, to }) => {
      if (user?.authId === to) {
        dispatch(removeFollowing({ id }));

        const userDetails = queryClient.getQueryData([
          "profile",
          to,
        ]) as IFullUserDoc;
        if (userDetails) {
          socketUtils.updateUserDetails({
            key: ["profile", to],
            mainData: userDetails,
            updateFeild: { followingCount: +userDetails.followingCount - 1 },
          });
        }
      }
    });

    return () => {
      socket?.off("add-follow");
      socket?.off("remove-follow");
    };
  }, [dispatch, queryClient, socket, user?.authId]);
};
export default useFollowSocket;
