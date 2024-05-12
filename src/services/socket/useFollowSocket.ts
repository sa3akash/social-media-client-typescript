import { useEffect } from "react";
import { useSocket } from "@/hooks/useSocket";
import { useQueryClient } from "@tanstack/react-query";
import { AppDispatch, RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import { addFollowing, removeFollowing } from "@/store/reducers/AuthReducer";

const useFollowSocket = () => {
  const { socket } = useSocket();
  const queryClient = useQueryClient();

  const dispatch: AppDispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    socket?.on("add-follow", ({ id, to }) => {
      if (user?.authId === to) {
        dispatch(addFollowing({ id }));
      }
    });
    socket?.on("remove-follow", ({ id, to }) => {
      if (user?.authId === to) {
        dispatch(removeFollowing({ id }));
      }
    });

    return () => {
      socket?.off("add-follow");
      socket?.off("remove-follow");
    };
  }, [dispatch, queryClient, socket, user?.authId]);
};
export default useFollowSocket;
